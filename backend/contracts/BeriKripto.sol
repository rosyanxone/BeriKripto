// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract BeriKripto {
    struct Donation {
        address donator;
        uint amount;
        uint createdAt;
    }

    struct Report {
        string title;
        string story;
        string image;
        uint createdAt;
    }

    struct Program {
        address owner;
        address payable recipient;
        string title;
        string description;
        uint deadline;
        uint target;
        uint amountCollected;
        string image;
        bool isFinish;
        Donation[] donations;
        Report report;
        uint createdAt;
    }

    mapping(uint => Program) private programs;

    uint public totalPrograms = 0;

    function createProgram(
        address payable _recipient,
        string memory _title,
        string memory _description,
        uint _target,
        uint _deadline,
        string memory _image
    ) external {
        Program storage newProgram = programs[totalPrograms];

        require(
            newProgram.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        newProgram.owner = msg.sender;
        newProgram.recipient = _recipient;
        newProgram.title = _title;
        newProgram.description = _description;
        newProgram.target = _target;
        newProgram.deadline = _deadline;
        newProgram.amountCollected = 0;
        newProgram.image = _image;
        newProgram.isFinish = false;
        newProgram.createdAt = block.timestamp;

        totalPrograms++;
    }

    function donateToProgram(uint _id)
        public
        payable
    {
        Program storage program = programs[_id];

        require(program.deadline > 0, "The program does not exist.");
        require(!program.isFinish, "The program has ended.");
        require(program.deadline > block.timestamp, "Program has reached its deadline.");

        uint amountDonation = msg.value;

        require(amountDonation > 0, "Donation amount must be greater than 0.");

        Donation memory newDonation = Donation(
            msg.sender,
            amountDonation,
            block.timestamp
        );

        program.donations.push(newDonation);
        program.amountCollected = program.amountCollected + amountDonation;
    }

    function getDonators(uint _id) public view returns (Donation[] memory) {
        Program memory program = programs[_id];

        require(program.deadline > 0, "The program does not exist.");

        return program.donations;
    }

    function getPrograms() public view returns (Program[] memory) {
        Program[] memory allPrograms = new Program[](totalPrograms);

        for (uint i = 0; i < totalPrograms; i++) {
            Program storage item = programs[i];

            allPrograms[i] = item;
        }

        return allPrograms;
    }

    function getProgram(uint _id) public view returns (Program memory) {
        Program storage program = programs[_id];

        require(program.deadline > 0, "The program does not exist.");

        return program;
    }

    function getDonation(uint _id) public {
        Program storage program = programs[_id];

        require(
            msg.sender == program.owner,
            "You're not the owner of program."
        );
        require(!program.isFinish, "The program has ended.");
        require(
            program.amountCollected >= program.target ||
                program.deadline < block.timestamp,
            "The program has not reached its deadline or target."
        );

        (bool sent, ) = payable(program.recipient).call{
            value: program.amountCollected
        }("");

        if (sent) {
            program.isFinish = true;
        }
    }

    function createReport(
        uint _id,
        string memory _title,
        string memory _story,
        string memory _image
    ) external {
        require(
            msg.sender == programs[_id].owner,
            "You're not the owner of program."
        );
        require(programs[_id].isFinish, "The program is not end yet.");

        Report storage report = programs[_id].report;

        require(report.createdAt == 0, "The report has been created.");

        report.title = _title;
        report.story = _story;
        report.image = _image;
        report.createdAt = block.timestamp;
    }

    function getReport(uint _id) public view returns (Report memory) {
        Report storage report = programs[_id].report;

        require(report.createdAt > 0, "The report does not exist.");

        return report;
    }
}
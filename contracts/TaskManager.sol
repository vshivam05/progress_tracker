pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        string title;
        string blockchainHash;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public taskCount;

    function storeTask(string memory _title, string memory _blockchainHash) public {
        tasks[taskCount] = Task(_title, _blockchainHash);
        taskCount++;
    }

    function getTask(uint256 _taskId) public view returns (string memory, string memory) {
        Task memory task = tasks[_taskId];
        return (task.title, task.blockchainHash);
    }
}

pragma solidity ^0.4.19;
contract Tarea2 {

address jobSeeker;
bool inglesRquired = false;
uint nivelestudiosRequired = 2;
uint id = 1;

function apply (uint nivelestudios, bool ingles) public returns (bool)  {
  require(nivelestudiosRequired == nivelestudios && inglesRquired == ingles);
    jobSeeker = msg.sender;
    return true;
    }

// Retrieving the job seekers
function getJobSeeker() public view returns (address) {
  return jobSeeker;
}

function getId() public view returns (uint) {
  return id;
}

}

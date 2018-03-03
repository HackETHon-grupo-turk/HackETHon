pragma solidity ^0.4.19;
contract Tarea1 {

address jobSeeker;
bool inglesRquired = true;
uint nivelestudiosRequired = 1;
uint id = 0;

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

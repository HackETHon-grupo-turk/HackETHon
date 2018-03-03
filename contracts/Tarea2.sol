pragma solidity ^0.4.19;
contract Tarea2 {

address[16] public jobSeeker;
bool inglesRquired = false;
uint nivelestudios = 2;

function solicita_tarea (uint jobId, bool ingles) public returns (uint)  {
  require(jobId >= 0 && jobId <= 7 && inglesRquired == ingles);
    //solicitante = u;
    jobSeeker[jobId] = msg.sender;
    return jobId;
    }

// Retrieving the job seekers
function getJobSeekers() public view returns (address[16]) {
      return jobSeeker;
    }
}

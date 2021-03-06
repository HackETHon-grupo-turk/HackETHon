App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../jobs.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.job-description').text(data[i].description);
        petTemplate.find('.job-price').text(data[i].price);
        petTemplate.find('.job-skills').text(data[i].skills);
        petTemplate.find('.btn-apply').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Tarea1.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var Tarea1Artifact = data;
      App.contracts.Tarea1 = TruffleContract(Tarea1Artifact);

      // Set the provider for our contract
      App.contracts.Tarea1.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-apply', App.handleAdopt);
  },

  markAdopted: function(adopter, account) {
    var adoptionInstance;

    App.contracts.Tarea1.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getJobSeeker.call();
    }).then(function(adopter) {
        adoptionInstance.getId.call().then(function(pos){
              if (adopter !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-pet').eq(pos).find('button').text('Success').attr('disabled', true);
                }})
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var nivelestudios = 4;
    var ingles = true;

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Tarea1.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        caca = adoptionInstance.apply(nivelestudios, ingles, {from: account});
        console.log(caca);
        return caca
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

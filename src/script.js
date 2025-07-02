const { createApp } = Vue;

createApp({
  data() {
    return {
      titans: [
        {
          "name": "tenebris",
          "title": "incarnation of darkness",
          "fights_at": "back",
          "main_role": "marksman",
          "additional_role": "support",
          "super_titan": true,
          "titan_class": "dark",
          "image_location": "_img/titan/tenebris.png",
          "avatar_location": "_img/avatar/tenebris.png"
        },
        {
          "name": "mort",
          "title": "all-consuming hunger",
          "fights_at": "middle",
          "main_role": "support",
          "additional_role": "none",
          "super_titan": false,
          "titan_class": "dark",
          "image_location": "_img/titan/mort.png",
          "avatar_location": "_img/avatar/mort.png"
        },
        {
          "name": "brustar",
          "title": "master of shadows",
          "fights_at": "front",
          "main_role": "tank",
          "additional_role": "none",
          "super_titan": false,
          "titan_class": "dark",
          "image_location": "_img/titan/brustar.png",
          "avatar_location": "_img/avatar/brustar.png"
        },
        {
          "name": "rigel",
          "title": "punishing hand",
          "fights_at": "front",
          "main_role": "tank",
          "additional_role": "none",
          "super_titan": false,
          "titan_class": "light",
          "image_location": "_img/titan/rigel.png",
          "avatar_location": "_img/avatar/rigel.png"
        },
        {
          "name": "solaris",
          "title": "radiance of creation",
          "fights_at": "back",
          "main_role": "marksman",
          "additional_role": "support",
          "super_titan": true,
          "titan_class": "light",
          "image_location": "_img/titan/solaris.png",
          "avatar_location": "_img/avatar/solaris.png"
        }
      ], // To store titan data
      showTeamDialog: false, // To toggle team dialog modal
      selectedTeam: [], // To store selected team
      blankCards: [null, null, null, null, null], // Five empty cards
      defeatResults: [], // To store defeat information after submit
      winningTeam: [] // Store the winning team based on the logic
    };
  },
  methods: {
    // Open the team creation dialog
    openTeamDialog() {
      this.showTeamDialog = true;
    },
    // Close the team creation dialog
    closeTeamDialog() {
      this.showTeamDialog = false;
      this.selectedTeam = [];
    },
    // Toggle selection of titans (limit to 5)
    toggleSelection(titan) {
      const index = this.selectedTeam.indexOf(titan);
      if (index === -1) {
        if (this.selectedTeam.length < 5) {
          this.selectedTeam.push(titan);
        } else {
          // alert('You can only select up to 5 titans.');
        }
      } else {
        this.selectedTeam.splice(index, 1); // Remove if already selected
      }
    },
    // Confirm the selected team and display it in the cards
    confirmTeam() {
      if (this.selectedTeam.length === 5) {
        this.blankCards = [...this.selectedTeam];
        this.showTeamDialog = false;
        this.calculateWinningTeam(); // Calculate the winning team after selecting
      } else {
        // alert("Please select exactly 5 titans.");
      }
    },
    // Remove a titan from a specific card and unselect it
    removeFromBlankCard(index) {
      const removedTitan = this.blankCards[index];
      if (removedTitan) {
        // Remove the titan from the blankCards and unselect it
        this.blankCards[index] = null;
        const titanIndex = this.selectedTeam.indexOf(removedTitan);
        if (titanIndex !== -1) {
          this.selectedTeam.splice(titanIndex, 1); // Remove from selected team
        }
      }
      this.openTeamDialog();
    },
    // Calculate the winning team based on whodefetewho.json data
    calculateWinningTeam() {
      fetch('data/whodefetewho.json')
        .then(response => response.json())
        .then(data => {
          const allDefeatedTitans = [];
          this.blankCards.forEach(titan => {
            if (titan) {
              const defeaters = data[titan.name] || [];
              allDefeatedTitans.push(...defeaters);
            }
          });
          // Find titans in blankCards that are not in the list of defeated titans
          this.winningTeam = this.blankCards.filter(titan => titan && !allDefeatedTitans.includes(titan.name));
        })
        .catch(error => {
          console.error("Error fetching who defeats who data:", error);
        });
    }
  },
  mounted() {
    // Fetch the JSON data when the component is mounted
    fetch('data/titan_list.json')
      .then(response => response.json())
      .then(data => {
        this.titans = data;  // Store fetched data in 'titans'
      });
  }
}).mount('#app');
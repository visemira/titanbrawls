const { createApp } = Vue;

createApp({
  data() {
    return {
      titans: [], // To store titan data
      default_team: [
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
      ],
      showTeamDialog: false, // To toggle team dialog modal
      selectedTeam: [], // To store selected team
      blankCards: [null, null, null, null, null], // Five empty cards
      defeatResults: [], // To store defeat information after submit
      titan_members: [
        { "id": 1, "name": "brustar" },
        { "id": 2, "name": "keros" },
        { "id": 3, "name": "mort" },
        { "id": 4, "name": "tenebris" },
        { "id": 5, "name": "amon" },
        { "id": 6, "name": "iyari" },
        { "id": 7, "name": "rigel" },
        { "id": 8, "name": "solaris" },
        { "id": 9, "name": "hyperion" },
        { "id": 10, "name": "mairi" },
        { "id": 11, "name": "nova" },
        { "id": 12, "name": "sigurd" },
        { "id": 13, "name": "araji" },
        { "id": 14, "name": "ignis" },
        { "id": 15, "name": "moloch" },
        { "id": 16, "name": "vulcan" },
        { "id": 17, "name": "angus" },
        { "id": 18, "name": "avalon" },
        { "id": 19, "name": "eden" },
        { "id": 20, "name": "sylva" }
      ],
      winningTeam: [
        {
          "id": 1,
          "challenging_team_id": 1,
          "team": [1, 5, 10, 11, 12],
          "suggested_by": "Name1"
        }
      ] // Store the winning team based on the logic
    };
  },
  
  methods: {
    // searchMember(team){
    //   const result = this.titan_members.find(titan => titan.id. toLowerCase() === team.toLowerCase()
    //   );
    //   return this.searchLocation(result);  
    // },
    searchLocation(name){
      // Filter through the titan list to find the titan matching the name
      const result = this.titans.find(titan => 
        titan.name.toLowerCase() === name.toLowerCase()
      );
      // If a match is found, return the titan's location or some relevant data
      if (result) {
        return result;
      } else {
        return "default";
      } 
    },
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
          // console.error("Error fetching who defeats who data:", error);
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

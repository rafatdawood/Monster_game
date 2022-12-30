let randValue = function (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
};
const Game = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            powerSpecial: 0,
            heal: 1,
            winner: null,
            battleLogs: []
        }
    },
    methods: {
        attackMonster() {
            const rez = randValue(10, 5);
            if (this.monsterHealth < rez) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= rez;
            }
            this.addLogMass('You','Attacked Monster',rez)
            this.attackPlayer();
            this.powerSpecial++;
        },
        attackPlayer() {
            const rez = randValue(12, 8);
            if (this.playerHealth < rez) {
                this.playerHealth = 0;
            } else {
                this.playerHealth -= rez;
            }
            this.addLogMass('Monster','Attacked You',rez)
        },
        specialAttack() {
            const rez = randValue(20, 10);
            if (this.monsterHealth < rez) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= rez;
            }
            this.addLogMass('You','Attacked Monster',rez)
            this.powerSpecial = 0;
            this.attackPlayer();
        },
        healYou() {
            const rez = randValue(25, 20);
            if (this.heal > 0) {
                this.playerHealth += rez;
                this.heal--;
            }
            this.addLogMass('You','Healld Your Self',rez)
            this.attackPlayer();
        },
        newGame() {
            this.monsterHealth = 100,
            this.playerHealth = 100,
            this.powerSpecial = 0,
            this.heal = 1,
            this.winner = null,
            this.battleLogs = []
        },
        surrender() {
            this.winner = "Monster"
        },
        addLogMass(who,what,value) {
            this.battleLogs.unshift({
                actionBy: who,
                actiontype: what,
                actionValue: value
            })
        }
    },
    computed: {
        monsterBarHealth() {
            return { width: this.monsterHealth + "%" };
        },
        playerBarHealth() {
            return { width: this.playerHealth + "%" };
        },
        disSpecial() {
            return this.powerSpecial < 3;
        },
        disheal() {
            return this.heal < 1;
        }
    },
    watch: {
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'Draw'
            } else if (value <= 0) {
                this.winner = 'Player'
            }
        },
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'Draw'
            } else if (value <= 0) {
                this.winner = 'Monster'
            }
        },
        
    }
})
Game.mount('#game')
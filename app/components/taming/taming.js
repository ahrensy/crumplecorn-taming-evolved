angular.module('TamingModule', []).controller('TamingController', ['$scope', '$rootScope', '$interval', '$cookies', '$animate', function($scope, $rootScope, $interval, $cookies, $animate) {

  var Cookies_Prefix = "TamingModule_";
  var Version = "20170527";
  
  var Audio_Volume = 0.3;
  var Audio_Alarm = new Audio('assets/audio/alarm.mp3');
  Audio_Alarm.volume = 0.0;
  Audio_Alarm.play();

  var Carnivore_Foods_Default = ['Kibble-Generic', 'Raw Mutton', 'Cooked Lamb Chop', 'Raw Prime Meat', 'Raw Prime Fish', 'C/J Prime', 'Raw Meat', 'Raw Fish', 'Cooked Meat'];
  var Herbivore_Foods_Default = ['Kibble-Generic', 'Mejoberry', 'Advanced Crop', 'Other Berry'];
  var Carnivore_Foods_No_Kibble = Carnivore_Foods_Default.slice(1, Carnivore_Foods_Default.length + 1);
  var Herbivore_Foods_No_Kibble = Herbivore_Foods_Default.slice(1, Herbivore_Foods_Default.length + 1);
  var Taming_Multiplier_Modifier = 2.0;

  /* Check:
    Arthropluera

  */

	$scope.foods = {
		'Kibble-Mosasaurus': {
			food: 79.98,
			affinity: 550
		},
		'Kibble-Generic': {
			food: 79.98,
			affinity: 400
		},
		'Kibble-Bronto': {
			food: 53.28,
			affinity: 400
		},
		'Kibble-Diplodocus': {
			food: 53.28,
			affinity: 275
		},
		'Kibble-Gigantopithecus': {
			food: 79.98,
			affinity: 300
		},
    'Raw Mutton-Compy': {
      food: 20,
      affinity: 1300
    },
		'Prime Meat-Compy': {
			food: 20,
			affinity: 600
		},
		'Raw Prime Fish-Compy': {
			food: 10,
			affinity: 240
		},
    'Raw Mutton': {
      food: 50,
      affinity: 375
    },
    'Cooked Lamb Chop': {
      food: 50,
      affinity: 200
    },
		'Raw Prime Meat': {
			food: 50,
			affinity: 150
		},
		'Spoiled Meat': {
			food: 50,
			affinity: 100
		},
		'Raw Prime Fish': {
			food: 25,
			affinity: 60
		},
		'Cooked Prime Meat': {
			food: 50,
			affinity: 75
		},
		'Prime Meat Jerky': {
			food: 50,
			affinity: 75
		},
		'C/J Prime': {
			food: 50,
			affinity: 75
		},
		'Raw Meat': {
			food: 50,
			affinity: 50
		},
		'Raw Meat-Dung Beetle': {
			food: 15,
			affinity: 15
		},
		'Cooked Meat': {
			food: 50,
			affinity: 25
		},
		'Meat Jerky': {
			food: 25,
			affinity: 25
		},
		'Cooked Prime Fish': {
			food: 25,
			affinity: 30
		},
		'Raw Fish': {
			food: 25,
			affinity: 20
		},
		'Cooked Fish': {
			food: 25,
			affinity: 10
		},
		'Mejoberry': {
			food: 30,
			affinity: 30
		},
		'Other Berry': {
			food: 20,
			affinity: 20
		},
		'Advanced Crop': {
			food: 40,
			affinity: 40
		},
		'Rare Mushroom': {
			food: 75,
			affinity: 90
		},
		'Plant Species X Seed': {
			food: 50,
			affinity: 45
		},
		'Giga Egg': {
			food: 300,
			affinity: 1200
		},
		'Quetz Egg': {
			food: 200,
			affinity: 550
		},
		'Rex Egg': {
			food: 200,
			affinity: 100
		},
		'Spino Egg': {
			food: 137.5,
			affinity: 80
		},
		'Bronto Egg': {
			food: 250,
			affinity: 60
		},
		'Carno Egg': {
			food: 137.5,
			affinity: 30
		},
		'Dodo Egg': {
			food: 20,
			affinity: 9
		},
		'Large Feces': {
			food: 37.5,
			affinity: 225
		},
		'Medium Feces': {
			food: 25,
			affinity: 150
		},
		'Small Feces': {
			food: 12.5,
			affinity: 75
		},
		'Human Feces': {
			food: 10,
			affinity: 60
		},
		'Angler Gel': {
			food: 8*3,
			affinity: 50.0
		},
		'Broth of Enlightenment': {
			food: 80,
			affinity: 1500.0
		},
		'Rare Flower': {
			food: 15*2.3333,
			affinity: 200
		},
		'Sweet Vegetable Cake': {
			food: 180,
			affinity: 450.0
		}
	}

	$scope.foodprioritylist = [
		'Kibble-Generic',
		'Kibble-Gigantopithecus',
		'Kibble-Bronto',
		'Kibble-Mosasaurus',
		'Kibble-Diplodocus',
		'Raw Prime Meat',
		'Prime Meat-Compy',
		'Cooked Prime Meat',
		'Prime Meat Jerky',
		'C/J Prime',
		'Raw Meat',
		'Cooked Meat',
		'Meat Jerky',
		'Advanced Crop',
		'Mejoberry',
		'Other Berry',
		'Spoiled Meat',
		'Raw Fish',
		'Cooked Fish',
		'Raw Prime Fish',
		'Cooked Prime Fish',
		'Rare Mushroom',
		'Plant Species X Seed',
		'Giga Egg',
		'Quetz Egg',
		'Rex Egg',
		'Spino Egg',
		'Bronto Egg',
		'Carno Egg',
		'Dodo Egg',
		'Large Feces',
		'Medium Feces',
		'Small Feces',
		'Human Feces',
		'Angler Gel',
		'Broth of Enlightenment',
		'Rare Flower'
	];

	$scope.komethods = {

		/*'Bow': 20*2+20*2.5,
		'Crossbow': 35*2+35*2.5,
		'Longneck': 26*6+26*2.5*/

		'Slingshot': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_DoubleTorp",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 14,
			torpor: 14*1.75,
			usesmeleedam: false,
			usesweapondam: true,
			time: 0
		},
		'Bow': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_Tranq",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 20,
			torpor: 20*2+20*2.5,
			usesmeleedam: false,
			usesweapondam: true,
			time: 5
		},

		'Crossbow': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_Tranq",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 35,
			torpor: 35*2+35*2.5,
			usesmeleedam: false,
			usesweapondam: true,
			time: 5
		},

		'Longneck': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_TranqMore",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 26,
			torpor: 26*6+26*2.5,
			usesmeleedam: false,
			usesweapondam: true,
			time: 5
		},
		'Fists': {
			damagetypes: [
				"DmgType_Melee_Torpidity_SelfHurt",
				"DmgType_Melee_Torpidity_StoneWeapon",
				"DmgType_Melee_Torpidity",
				"DmgType_Melee_Human",
				"DmgType_Melee"
			],
			damage: 8,
			torpor: 8*1.75,
			usesmeleedam: true,
			usesweapondam: false,
			time: 0
		},
		'Club': {
			damagetypes: [
				"DmgType_Melee_HighTorpidity_StoneWeapon_Club",
				"DmgType_Melee_HighTorpidity_StoneWeapon",
				"DmgType_Melee_Torpidity_StoneWeapon",
				"DmgType_Melee_Torpidity",
				"DmgType_Melee_Human",
				"DmgType_Melee"
			],
			damage: 5,
			torpor: 5*3.75,
			usesmeleedam: true,
			usesweapondam: true,
			time: 0
		},
		'Electric Prod': {
			damagetypes: [
				"DmgType_Melee_Human_ElectricStun",
				"DmgType_Melee_Human",
				"DmgType_Melee"
			],
			damage: 1,
			torpor: 1*500,
			usesmeleedam: false,
			usesweapondam: true,
			time: 0
		},
		'Scorpion': {
			damagetypes: [
				"DmgType_Melee_TorpPoison",
				"DmgType_Melee_Dino_Carnivore_Small",
				"DmgType_Melee_Dino_Carnivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 15,
			torpor: 15*3,
			usesmeleedam: true,
			usesweapondam: false,
			time: 10
		},
		'Beelzebufo (Main)': {
			damagetypes: [
				"DmgType_Melee_TorpPoison_ChitinPaste",
				"DmgType_Melee_TorpPoison",
				"DmgType_Melee_Dino_Carnivore_Small",
				"DmgType_Melee_Dino_Carnivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 12,
			torpor: 12*3,
			usesmeleedam: true,
			usesweapondam: false,
			time: 10
		},
		'Beelzebufo (Secondary)': {
			damagetypes: [
				"DmgType_Melee_TorpPoison_ChitinPaste",
				"DmgType_Melee_TorpPoison",
				"DmgType_Melee_Dino_Carnivore_Small",
				"DmgType_Melee_Dino_Carnivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 20,
			torpor: 20*3,
			usesmeleedam: true,
			usesweapondam: false,
			time: 10
		},
		'Pachy (Normal)': {
			damagetypes: [
				"DmgType_Melee_Dino_Herbivore_Small_LargeTorp",
				"DmgType_Melee_Dino_Herbivore_Small",
				"DmgType_Melee_Dino_Herbivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 10,
			torpor: 10*1,
			usesmeleedam: true,
			usesweapondam: false,
			time: 0
		},
		'Pachy (Charge)': {
			damagetypes: [
				"DmgType_Melee_Dino_Herbivore_Small_HugeTorp",
				"DmgType_Melee_Dino_Herbivore_Small",
				"DmgType_Melee_Dino_Herbivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 17,
			torpor: 17*3.5,
			usesmeleedam: true,
			usesweapondam: false,
			time: 0
		}

	};

	$scope.narcoticsmethods = {
		"Narcotics": {
			torpor: 40,
			time: 8,
			rate: 5
		},
		"Narcoberries": {
			torpor: 7.5,
			time: 3,
			rate: 2.5
		}
	}

  /*  [Creature]_Character_BP   -   filter by 'aff'
  **    Required Tame Affinity                          the base level of affinity required for a creature of this type at level 0
  **    Required Tame Affinity Per Base Level           the affinity gain per level of the creature
  **    Tame Ineffectiveness By Affinity                Used in Taming Effectiveness

                                -   filter by 'damage'
        Bone Damage Multipliers

      DinoCharacterStatusComponent_BP_[Creature]    -   filter by 'food'
        Base Food Consumption Rate                      the creature's food consumption rate
        Prone Water Food Consumption Multiplier         a multiplier which is applied when the dino is unconcious and being tamed

                                                    -   filter by 'torp'
        Torpidity                                       the base torpor of the creature at level 1
        Recovery Rate Status Value                      part of the torpor reduction rate
        Knocked Out Torpidity Recovery Rate Multiplier  a multiplier for the torpor reduction rate when the creature is knocked out
        The Max Torpor Increase Per base Level          percentage of the creature's base torpor it gains per level after level 1
      
      DinoSettings_[Type]_[Size]_[Creature]   -   
        Food Effectiveness Multipliers                  Drill down
        Extra Food Effectiveness Multipliers

        The type of food can be found in "Food Item Parent", 
          and the value we are interested in is the "Affinity Override", which is the amount of affinity gain when this type of food is eaten
        
                                              -   filter by 'damage'
        Melee_Torpidity_StoneWeapon (club)
        Melee_Human (fists)
        Melee_Dino_Herbivore (Pachy)
  */

	$scope.creatures = {

		Achatina: {
			requiredTameAffinity: 4000.0,
			requiredTameAffinityPerBaseLevel: 150.0,
			tameIneffectivenessByAffinity: 0.2,
      baseFoodConsumptionRate: -0.001736,
      proneWaterFoodConsumptionMultiplier: 864.055298,
			get foodrate () {
        return this.baseFoodConsumptionRate * this.proneWaterFoodConsumptionMultiplier;
      },
			baseTorpidity: 50.0,
      recoveryRateStatusValue: -0.1,
      knockedOutTorpidityRecoveryRateMultiplier: 3.0,
			get baseTorporRecoveryRate () {
        return this.recoveryRateStatusValue * this.knockedOutTorpidityRecoveryRateMultiplier;
      },
			torporPerLevel: 0.06,
			basefood: 'Sweet Vegetable Cake',
			foods: ['Sweet Vegetable Cake'],
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Neck": 1.0,
				"Tail": 0.5,
				"Shell": 0.1
			}
		},

		Allosaurus: {
			foodrate: -0.001852*180.063385,
			baseTorpidity: 1000.0,
			baseTorporRecoveryRate: -0.1*8.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2400.0,
			requiredTameAffinityPerBaseLevel: 100,
			tameIneffectivenessByAffinity: 1.875,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Diplo',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Anglerfish: {
			foodrate: -0.001852*149.988007,
			baseTorpidity: 900,
			baseTorporRecoveryRate: -7.0*0.4,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1800.0,
			requiredTameAffinityPerBaseLevel: 90,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Kairuku',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},		

		Ankylosaurus: {
			foodrate: -0.003156*176.03154,
			baseTorpidity: 420,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3000,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 0.2,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Dilo',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Araneo: {
			foodrate: -0.001736*864.055298,
			requiredTameAffinity: 4000,
			requiredTameAffinityPerBaseLevel: 120,
			tameIneffectivenessByAffinity: 4.166667,
			basefood: 'Spoiled Meat',
			foods: ['Spoiled Meat'],
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.0
		},

		Argentavis: {
			foodrate: -0.001852*199.983994,
			baseTorpidity: 600,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2000,
			requiredTameAffinityPerBaseLevel: 100,
			tameIneffectivenessByAffinity: 1.875,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Stego',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Projectile": 1.5,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Arthropluera: {
			foodrate: -0.001543*648.088135,
			requiredTameAffinity: 3000.0,
			requiredTameAffinityPerBaseLevel: 75.0,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Spoiled Meat',
			foods: ['Broth of Enlightenment', 'Spoiled Meat', 'Raw Meat'],
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.6
		},

		Beelzebufo: {
			foodrate: -0.001929*648.00415,
			baseTorpidity: 200,
			baseTorporRecoveryRate: -0.1*6.666,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1800.000,
			requiredTameAffinityPerBaseLevel: 75,
			tameIneffectivenessByAffinity: 0.4,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Scorp',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Brontosaurus: {
			foodrate: -0.007716*180.001144,
			baseTorpidity: 1900,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 10000,
			requiredTameAffinityPerBaseLevel: 500,
			tameIneffectivenessByAffinity: 0.06,
			basefood: 'Mejoberry',
			foods: ['Kibble-Bronto'].concat(Herbivore_Foods_No_Kibble),
			kibble: 'Turtle',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Carbonemys: {
			foodrate: -0.003156*352.06308,
			baseTorpidity: 275,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3000,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 0.2,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Ptera',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Shell": 0.2,
				"Tail": 0.5
			}
		},

		Carnotaurus: {
			foodrate: -0.001852*199.983944,
			baseTorpidity: 350,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2000,
			requiredTameAffinityPerBaseLevel: 100,
			tameIneffectivenessByAffinity: 1.875,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Ankylo',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Castoroides: {
			foodrate: -0.002314*160.056335,
			baseTorpidity: 350,
			baseTorporRecoveryRate: -0.1*15.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2000,
			requiredTameAffinityPerBaseLevel: 100,
			tameIneffectivenessByAffinity: 0.3,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Galli',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Compsognathus: {
			foodrate: -0.000868*1728.110596,
			baseTorpidity: 25,
			baseTorporRecoveryRate: -0.1*13.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 500.0,
			requiredTameAffinityPerBaseLevel: 65.0,
			tameIneffectivenessByAffinity: 8.333333,
			basefood: 'Prime Meat-Compy',
			foods: ['Raw Mutton-Compy', 'Prime Meat-Compy', 'Raw Prime Fish-Compy'],
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Dilophosaurus: {
			foodrate: -0.000868*1728.110596,
			baseTorpidity: 75,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 450,
			requiredTameAffinityPerBaseLevel: 22.5,
			tameIneffectivenessByAffinity: 8.333333,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_No_Kibble,
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Dimetrodon: {
			foodrate: -0.001736*160.010239,
			baseTorpidity: 750.0,
			baseTorporRecoveryRate: -10.0*2.5,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1500.0,
			requiredTameAffinityPerBaseLevel: 90.0,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Quetzal',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Dimorphodon: {
			foodrate: -0.001302*1152.07373,
			baseTorpidity: 100,
			baseTorporRecoveryRate: -0.1*8.333,
			torporPerLevel: 0.06,
			requiredTameAffinity: 900,
			requiredTameAffinityPerBaseLevel: 45,
			tameIneffectivenessByAffinity: 4.166666,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_No_Kibble,
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Diplodocus: {
			foodrate: -0.007716*180.001144,
			baseTorpidity: 3000.0,
			baseTorporRecoveryRate: -1*0.75,
			torporPerLevel: 0.06,
			requiredTameAffinity: 7500.0,
			requiredTameAffinityPerBaseLevel: 375.0,
			tameIneffectivenessByAffinity: 0.08,
			basefood: 'Mejoberry',
			foods: ['Kibble-Diplodocus'].concat(Herbivore_Foods_No_Kibble),
			kibble: 'Lystrosaurus',
			tamingmethods: ['Standard', 'Non-Violent'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			},
			nonviolentfoodratemultiplier: 0.5, //2 in devkit
			nonviolentfoodaffinitymultiplier: 3.0
		},

		"Direbear": {
			foodrate: -0.003156*150.0,
			baseTorpidity: 1000,
			baseTorporRecoveryRate: -0.1*9.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 4000,
			requiredTameAffinityPerBaseLevel: 125,
			tameIneffectivenessByAffinity: 1.25,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default.concat(['Mejoberry', 'Other Berry']),
			kibble: 'Carno',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		"Direwolf": {
			foodrate: -0.444444462455,
			baseTorpidity: 450,
			baseTorporRecoveryRate: -0.1*5.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200,
			requiredTameAffinityPerBaseLevel: 60,
			tameIneffectivenessByAffinity: 3.125,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Carno',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 2.5
			}
		},

		Dodo: {
			foodrate: -0.000868*2880.184326,
			baseTorpidity: 30,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 450,
			requiredTameAffinityPerBaseLevel: 22.5,
			tameIneffectivenessByAffinity: 1.333333,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_No_Kibble,
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Doedicurus: {
			foodrate: -0.003156*176.03154,
			baseTorpidity: 800,
			baseTorporRecoveryRate: -0.1*7.5,
			torporPerLevel: 0.06,
			requiredTameAffinity: 4000,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 0.2,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Dilo',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		"Dung Beetle": {
			foodrate: -0.001488*336.021515,
			requiredTameAffinity: 900.0,
			requiredTameAffinityPerBaseLevel: 50.0,
			tameIneffectivenessByAffinity: 4.166667,
			basefood: 'Raw Meat',
			foods: ['Large Feces', 'Medium Feces', 'Small Feces', 'Human Feces', 'Spoiled Meat', 'Raw Meat'],
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2,
			nonviolentfoodaffinitymultiplier: 1.0
		},

		Dunkleosteus: {
			foodrate: -0.001852*199.983994,
			baseTorpidity: 1150.0,
			baseTorporRecoveryRate: -2.0*0.5,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1300.0,
			requiredTameAffinityPerBaseLevel: 60.0,
			tameIneffectivenessByAffinity: 3.275,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Titanoboa',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DamageType": 0.275,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Gallimimus: {
			foodrate: -0.001929*432.002777,
			baseTorpidity: 420.0,
			baseTorporRecoveryRate: -1.67*2.5,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2200.0,
			requiredTameAffinityPerBaseLevel: 95.0,
			tameIneffectivenessByAffinity: 0.4,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Dimetro',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Head": 2
			}
		},

		Giganotosaurus: {
			foodrate: -0.002314*160.056335,
			baseTorpidity: 10000,
			baseTorporRecoveryRate: -25.0*4.8,
			torporPerLevel: 0.06,
			requiredTameAffinity: 5000,
			requiredTameAffinityPerBaseLevel: 160,
			tameIneffectivenessByAffinity: 1.25,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Quetzal',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Gigantopithecus: {
			foodrate: -0.004156*176.03154,
			requiredTameAffinity: 4600.0,
			requiredTameAffinityPerBaseLevel: 75,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Mejoberry',
			foods: ['Kibble-Gigantopithecus', 'Mejoberry', 'Other Berry'],
			kibble: 'Titanoboa',
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 0.5, //2 in devkit
			nonviolentfoodaffinitymultiplier: 1.65
		},

		Ichthyosaurus: {
			foodrate: -0.001929*420.0,
			requiredTameAffinity: 1500,
			requiredTameAffinityPerBaseLevel: 75,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Dodo',
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2.5,
			nonviolentfoodaffinitymultiplier: 1.6
		},

		Kairuku: {
			foodrate: -0.001389*1079.913574,
			baseTorpidity: 300,
			baseTorporRecoveryRate: -0.1*10.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 900,
			requiredTameAffinityPerBaseLevel: 45,
			tameIneffectivenessByAffinity: 4.166667,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_No_Kibble,
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Lystrosaurus: {
			foodrate: -0.000868*2880.184326,
			requiredTameAffinity: 2000.0,
			requiredTameAffinityPerBaseLevel: 22.5,
			tameIneffectivenessByAffinity: 1.333333,
			basefood: 'Mejoberry',
			foods: ['Rare Flower', 'Mejoberry', 'Other Berry'],
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.6
		},

		Mammoth: {
			foodrate: -0.004133*192.027771,
			baseTorpidity: 550,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 5000,
			requiredTameAffinityPerBaseLevel: 250,
			tameIneffectivenessByAffinity: 0.12,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Raptor',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Manta: {
			foodrate: -0.001929*420.0,
			requiredTameAffinity: 1500.0,
			requiredTameAffinityPerBaseLevel: 75.0,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Angler Gel',
			foods: ['Angler Gel'],
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2.5,
			nonviolentfoodaffinitymultiplier: 1.6
		},

		Megaloceros: {
			foodrate: -0.001543*432.058746,
			baseTorpidity: 175,
			baseTorporRecoveryRate: -0.1*2.915,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200,
			requiredTameAffinityPerBaseLevel: 60,
			tameIneffectivenessByAffinity: 0.5,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Dimorph',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1.0000,
				"Head": 2.5
			}
		},

		Megalodon: {
			foodrate: -0.001852*199.983994,
			baseTorpidity: 800,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2000,
			requiredTameAffinityPerBaseLevel: 100,
			tameIneffectivenessByAffinity: 1.875,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Spino',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Mesopithicus: {
			foodrate: -0.000868*2880.184326,
			requiredTameAffinity: 2200,
			requiredTameAffinityPerBaseLevel: 65,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Mejoberry',
			foods: ['Kibble-Generic', 'Mejoberry', 'Other Berry'],
			kibble: 'Dodo',
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2,
			nonviolentfoodaffinitymultiplier: 1.65
		},

		Mosasaurus: {
			foodrate: -0.005*180.001144,
			baseTorpidity: 3000,
			baseTorporRecoveryRate: -0.4*32.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 11000,
			requiredTameAffinityPerBaseLevel: 600,
			tameIneffectivenessByAffinity: 0.06,
			basefood: 'Raw Meat',
			foods: ['Kibble-Mosasaurus'].concat(Carnivore_Foods_No_Kibble),
			kibble: 'Quetzal',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Onyc: {
			foodrate: -0.002893*192.034409,
			requiredTameAffinity: 3000,
			requiredTameAffinityPerBaseLevel: 90,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_No_Kibble,
			tamingmethods: ['Non-Violent'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.0
		},

		Oviraptor: {
			foodrate: -0.001302*768.049133,
			baseTorpidity: 125.0,
			baseTorporRecoveryRate: -0.1*2.08,
			torporPerLevel: 0.06,
			requiredTameAffinity: 960.0,
			requiredTameAffinityPerBaseLevel: 42.0,
			tameIneffectivenessByAffinity: 16.666668,
			basefood: 'Dodo Egg',
			foods: ['Giga Egg', 'Quetz Egg', 'Rex Egg', 'Spino Egg', 'Bronto Egg', 'Carno Egg', 'Dodo Egg'],
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Pachycephalosaurus: {
			foodrate: -0.001543*648.088135,
			baseTorpidity: 160.0,
			baseTorporRecoveryRate: -0.1*2.666,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200.0,
			requiredTameAffinityPerBaseLevel: 60.0,
			tameIneffectivenessByAffinity: 0.5,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Dilo',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Head": 0.125
			}
		},

		Paraceratherium: {
			foodrate: -0.0035*327.6474,
			baseTorpidity: 1300.0,
			baseTorporRecoveryRate: -0.1*9.025,
			torporPerLevel: 0.06,
			requiredTameAffinity: 6500.0,
			requiredTameAffinityPerBaseLevel: 325.0,
			tameIneffectivenessByAffinity: 0.0923,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Pachy',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Parasaurolophus: {
			foodrate: -0.001929*864.005554,
			baseTorpidity: 150,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1500,
			requiredTameAffinityPerBaseLevel: 75,
			tameIneffectivenessByAffinity: 0.4,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_No_Kibble,
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Head": 2
			}
		},

		Pelagornis: {
			foodrate: -0.001543*216.029373,
			baseTorpidity: 120.0,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200.0,
			requiredTameAffinityPerBaseLevel: 60.0,
			tameIneffectivenessByAffinity: 3.125,
			basefood: 'Raw Fish',
			foods: ['Kibble-Generic', 'Raw Prime Fish', 'Raw Fish'],
			kibble: 'Compy',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Phiomia: {
			foodrate: -0.003156*1584.283936,
			baseTorpidity: 240,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3000,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 0.2,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_No_Kibble,
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Plesiosaurus: {
			foodrate: -0.003858*180.001144,
			baseTorpidity: 1600,
			baseTorporRecoveryRate: -0.1*21.333332,
			torporPerLevel: 0.06,
			requiredTameAffinity: 5000,
			requiredTameAffinityPerBaseLevel: 250,
			tameIneffectivenessByAffinity: 0.75,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Rex',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Procoptodon: {
			foodrate: -0.001929*648.00415,
			baseTorpidity: 350.0,
			baseTorporRecoveryRate: -0.1*6.666,
			torporPerLevel: 0.034285714,
			requiredTameAffinity: 3000.0,
			requiredTameAffinityPerBaseLevel: 150.0,
			tameIneffectivenessByAffinity: 0.2,
			basefood: 'Rare Mushroom',
			foods: ['Rare Mushroom', 'Plant Species X Seed'],
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Pteranodon: {
			foodrate: -0.001543*216.029373,
			baseTorpidity: 120,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200,
			requiredTameAffinityPerBaseLevel: 60,
			tameIneffectivenessByAffinity: 3.125,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Dodo',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Projectile": 1.5,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Pulmonoscorpius: {
			foodrate: -0.001929*432.002777,
			baseTorpidity: 150,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1500,
			requiredTameAffinityPerBaseLevel: 75,
			tameIneffectivenessByAffinity: 6.15, //2.5 in devkit
			basefood: 'Spoiled Meat',
			foods: ['Spoiled Meat'],
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		Quetzalcoatlus: {
			foodrate: -0.0035*140.0,
			baseTorpidity: 1850.0,
			baseTorporRecoveryRate: -0.2*17,
			torporPerLevel: 0.06,
			requiredTameAffinity: 6850,
			requiredTameAffinityPerBaseLevel: 300,
			tameIneffectivenessByAffinity: 0.9375,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Rex',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Projectile": 1.2,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Raptor: {
			foodrate: -0.001543*648.088135,
			baseTorpidity: 180,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200,
			requiredTameAffinityPerBaseLevel: 60,
			tameIneffectivenessByAffinity: 3.125,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Parasaur',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Rex: {
			foodrate: -0.002314*180.063385,
			baseTorpidity: 1550,
			baseTorporRecoveryRate: -0.1*7.25,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3450,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 1.25,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Scorp',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Sabertooth: {
			foodrate: -0.001543*288.039185,
			baseTorpidity: 500,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1200,
			requiredTameAffinityPerBaseLevel: 60,
			tameIneffectivenessByAffinity: 3.125,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Bronto',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Sarcosuchus: {
			foodrate: -0.001578*211.237854,
			baseTorpidity: 400,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 2000,
			requiredTameAffinityPerBaseLevel: 75,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Trike',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Spinosaurus: {
			foodrate: -0.002066*150.0,
			baseTorpidity: 850,
			baseTorporRecoveryRate: -0.1*21.333332,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3200,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 1.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Argent',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1
			}
		},

		Stegosaurus: {
			foodrate: -0.005341*208.034286,
			baseTorpidity: 500,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 6000,
			requiredTameAffinityPerBaseLevel: 300,
			tameIneffectivenessByAffinity: 0.1,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Sarco',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1,
				"Head": 1.67
			}
		},

		"Terror Bird": {
			foodrate: -0.001578*352.06308,
			baseTorpidity: 300,
			baseTorporRecoveryRate: -1.5*1.5,
			torporPerLevel: 0.06,
			requiredTameAffinity: 1600.0,
			requiredTameAffinityPerBaseLevel: 85.0,
			tameIneffectivenessByAffinity: 2.5,
			basefood: 'Raw Meat',
			foods: Carnivore_Foods_Default,
			kibble: 'Gallimimus',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Body": 1,
				"Head": 3
			}
		},

		Triceratops: {
			foodrate: -0.003156*352.06308,
			baseTorpidity: 250,
			baseTorporRecoveryRate: -0.1*3,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3000,
			requiredTameAffinityPerBaseLevel: 150,
			tameIneffectivenessByAffinity: 0.2,
			basefood: 'Mejoberry',
			foods: Herbivore_Foods_Default,
			kibble: 'Carno',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		},

		"Woolly Rhino": {
			foodrate: -0.003156*150.0,
			baseTorpidity: 600.0,
			baseTorporRecoveryRate: -0.1*9.0,
			torporPerLevel: 0.06,
			requiredTameAffinity: 3450.0,
			requiredTameAffinityPerBaseLevel: 125.0,
			tameIneffectivenessByAffinity: 1.25,
			basefood: 'Mejoberry',
			foods: ['Kibble-Bronto'].concat(Herbivore_Foods_No_Kibble),
			kibble: 'Terror Bird',
			tamingmethods: ['Standard'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Body": 1
			}
		}
	}

	$scope.tablevisibility = $cookies.getObject(Cookies_Prefix + 'tablevisibility');
	if ($scope.tablevisibility == undefined || $scope.tablevisibility.version != Version) {
		$scope.tablevisibility = {
			"version": Version,
			"Creature": true,
			"Food": true,
			"Tame": true,
			"Narcotics": true,
			"Starve": true,
			"Knockout": true
		}
	}

  $scope.showTameDetails = function() {
    $scope.isShowingTameDetails = $scope.creature.tamingmethod == 'Standard' && $scope.tablevisibility['Tame'];
  }

	$scope.showextratamedetails = $cookies.getObject(Cookies_Prefix + 'showextratamedetails');
	if ($scope.showextratamedetails == undefined) {
		$scope.showextratamedetails = 0;
	}

	$scope.showanimations = $cookies.getObject(Cookies_Prefix + 'showanimations');
	if ($scope.showanimations == undefined) {
		$scope.showanimations = 1;
	}
	$animate.enabled($scope.showanimations);

	$scope.showoldselects = $cookies.getObject(Cookies_Prefix + 'showoldselects');
	if ($scope.showoldselects == undefined) {
		$scope.showoldselects = 0;
	}

	$scope.texponent = 0.800403041; //0.829050872; //0.76593984; //0.827745067192723; //0.8107032;
	$scope.tcoefficient = 22.39671632; //25.7837826; //18.62553525; //24.7933173692763; //21.93040668;

	//Value relating to the creature being tamed
	$scope.creature = $cookies.getObject(Cookies_Prefix + 'creature');
	if ($scope.creature == undefined || !($scope.creature.name in $scope.creatures) || $scope.creature.version != Version) {
		$scope.creature = {
			version: Version,
			searchname: "Pteranodon",
			name: "Pteranodon",
			level: 150,
			tamingmethod: "Standard",
			tamingmultiplier: 1,
			foodratemultiplier: 1,
			totalfood: 0,
			suppliedaffinity: 0
		};
	}

	//Narcotics related constants for this creature/level
	$scope.narcotics = $cookies.getObject(Cookies_Prefix + 'narcotics');
	if ($scope.narcotics == undefined) {
    $scope.narcotics = {
      buffertime: 0,
      max: 0,
      min: 0,
      buffernarcotics:0,
      narcoticsbuffertime: 0,
      narcoticsmethod: "Narcotics"
    };
  }

  $scope.saveNarcotics = function() {
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'narcotics', $scope.narcotics, {expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate()+1)});
  }

	//Narcotics related variables depending on creature's actual state
	$scope.narcoticsTiming = $cookies.getObject(Cookies_Prefix + 'narcoticsTiming');
	if ($scope.narcoticsTiming == undefined) {
    $scope.narcoticsTiming = {
      start: new Date(),
      topupnarcotics: 0,
      currenttorpor: 0,
      time: false,
      intervalid: null,
      buffertime: 0,
      alarm: true,
      alarmthreshold: 7,
      narcoticsbuffertime: 0,
      narcoticstimes: {
        "Narcotics": 0,
        "Narcoberries": 0
      },
      supplynarcoticamount: 25
    };
  }

  $scope.saveNarcoticsTiming = function() {
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'narcoticsTiming', $scope.narcoticsTiming, {expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate())});
  }

	//Starve Timing Variables
	$scope.starveTiming = $cookies.getObject(Cookies_Prefix + 'starveTiming');
	if ($scope.starveTiming == undefined) {
    $scope.starveTiming = {
      start: new Date(),
      maxfood: 0,
      currentfood: 0,
      time: false,
      intervalid: null,
      starvetime: 0,
      alarm: false,
      alarmthreshold: 7
    };
  }

  $scope.saveStarveTiming = function() {
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'starveTiming', $scope.starveTiming, {expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate())});
  }

	//Knocking out related variables
	$scope.ko = $cookies.getObject(Cookies_Prefix + 'ko');
	if ($scope.ko == undefined || $scope.ko.version != Version) {
		$scope.ko = {
			version: Version,
			koweapondam: 100,
			komeleedam: 100,
			searchkomethod: "Crossbow",
			komethod: "Crossbow",
			koquantities: {},
			kotimes: {},
			kotorpor: {},
			kodamage: {}
		};
	}

	$scope.showhidetable = function(table) {
		$scope.tablevisibility[table] = !$scope.tablevisibility[table];
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'tablevisibility', $scope.tablevisibility, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});
    $scope.showTameDetails();
	}

	$scope.showhideextratamedetails = function() {
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'showextratamedetails', $scope.showextratamedetails, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});
	}

	$scope.showhideoldselects = function() {
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'showoldselects', $scope.showoldselects, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});
	}

	$scope.showhideanimations = function() {
		var now = new Date();
		$animate.enabled($scope.showanimations);
		$cookies.putObject(Cookies_Prefix + 'showanimations', $scope.showanimations, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});
		if ($scope.showanimations == 0) {
			alert("Refresh the page");
		}
	}

	$scope.filterFoods = function(item) {
		return ($scope.foodamounts[item]>0);
	}

	$scope.searchdino = function() {
		//alert("searchdino");
		var creature = $scope.creature;
		var creatures = $scope.creatures;

		if (creature.searchname in creatures) {
			creature.name = creature.searchname;
			$scope.selectdino();
		}
	}

	$scope.searchkomethod = function() {
		var ko = $scope.ko;
		var komethods = $scope.komethods;
		if (ko.searchkomethod in komethods) {
			ko.komethod = ko.searchkomethod;
			$scope.knockoutcalc();
		}
	}

	$scope.selectdino = function() {
		creature = $scope.creature;
		creaturedata = $scope.creatures[creature.name];

		creature.searchname = creature.name; //Ensure the searchname is kept up to date

		creature.suppliedaffinity = 0;
		if (creaturedata.foods.indexOf(creature.fillfood)  ==  -1 ) {
			creature.fillfood = creaturedata.foods[0];
		}
		if (creaturedata.tamingmethods.indexOf(creature.tamingmethod)  ==  -1 ) {
			creature.tamingmethod = creaturedata.tamingmethods[0];
		}

		$scope.resetfoods();
		$scope.narcoticsTiming.time = false;
		$scope.narcoticstimer();
		$scope.selectlevel();
	}

	$scope.selectlevel = function() {
		creature = $scope.creature;
		$rootScope.pagetitle = "Tame: " + creature.level + " " + creature.name + " | Crumplecorn's Taming: Evolved";
		if (creature.level>2000) {
			creature.level = 2000;
		}
		if (isNaN(creature.level) || creature.level<1) {
			return;
		}

		creaturedata = $scope.creatures[creature.name];
		creature.requiredaffinity = creaturedata.requiredTameAffinity+creaturedata.requiredTameAffinityPerBaseLevel*creature.level;
		creature.torpor = creaturedata.baseTorpidity+creaturedata.baseTorpidity*creaturedata.torporPerLevel*(creature.level-1);
		creature.torporrate = creaturedata.baseTorporRecoveryRate+Math.pow(creature.level-1,$scope.texponent)/($scope.tcoefficient/creaturedata.baseTorporRecoveryRate);
		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'creature', $scope.creature, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});
		$scope.maxfoodcalc();
		$scope.alltimescalc();
		$scope.foodcalc();
		$scope.knockoutcalc();
		$scope.starveTimingcalc();
	}

	$scope.settamingmethod = function() { //General purpose function-caller function for a few fields
		if ($scope.creature.tamingmultiplier > 0 && $scope.creature.foodratemultiplier > 0) { //Necessary to prevent endless loop
			var now = new Date();
			$cookies.putObject(Cookies_Prefix + 'creature', $scope.creature, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});

			$scope.maxfoodcalc();
			$scope.foodcalc();
			$scope.alltimescalc();
		}
	}

	$scope.setFillFood = function(food) {
		$scope.foodamounts[$scope.creature.fillfood] = 0;
		$scope.creature.fillfood = food;
		$scope.foodcalc();
	}

	$scope.resetfoods = function() {
		$scope.foodamounts = {};
		for (var food in $scope.foods) {
			$scope.foodamounts[food] = 0;
		}
	}

	$scope.maxfoodcalc = function() {
		$scope.maxfoodamounts = {};

		if (creature.tamingmethod == "Standard") {

			for (var food in $scope.foods) {
				$scope.maxfoodamounts[food] = Math.ceil(creature.requiredaffinity / $scope.foods[food].affinity / (creature.tamingmultiplier*Taming_Multiplier_Modifier) );
			}

		}

		if (creature.tamingmethod == "Non-Violent") {

			for (var food in $scope.foods) {
				$scope.maxfoodamounts[food] = Math.ceil(creature.requiredaffinity/$scope.foods[food].affinity/(creature.tamingmultiplier*Taming_Multiplier_Modifier)/creaturedata.nonviolentfoodaffinitymultiplier);
			}

		}
	}

	$scope.alltimescalc = function() {
		$scope.times = {};

		if ($scope.creature.tamingmethod == "Standard") {
			$scope.creature.foodrate = $scope.creatures[$scope.creature.name].foodrate * $scope.creature.foodratemultiplier;
		}
		if (creature.tamingmethod == "Non-Violent") {
			$scope.creature.foodrate = $scope.creatures[$scope.creature.name].foodrate * $scope.creature.foodratemultiplier * $scope.creatures[$scope.creature.name].nonviolentfoodratemultiplier;
		}

		for (var food in $scope.maxfoodamounts) {
			$scope.times[food] = $scope.maxfoodamounts[food]*-$scope.foods[food].food/$scope.creature.foodrate;
		}

	}

	$scope.foodcalc = function() {
		creature = $scope.creature;
		creaturedata = $scope.creatures[creature.name];
		foods = $scope.foods;
		foodamounts = $scope.foodamounts;
		affinity = 0;
		food = 0;
		foodamounts[creature.fillfood] = 0;

		if (creature.tamingmethod == "Standard") {

			for (var i = 0; i < creaturedata.foods.length; i++) {
				
				affinity += foods[creaturedata.foods[i]].affinity*(creature.tamingmultiplier*Taming_Multiplier_Modifier)*foodamounts[creaturedata.foods[i]];
				food -= foods[creaturedata.foods[i]].food*foodamounts[creaturedata.foods[i]];
			}
			foodamounts[creature.fillfood] = Math.max(Math.ceil((creature.requiredaffinity-affinity)/foods[creature.fillfood].affinity/(creature.tamingmultiplier*Taming_Multiplier_Modifier)),0);
			affinity += foods[creature.fillfood].affinity*(creature.tamingmultiplier*Taming_Multiplier_Modifier)*foodamounts[creature.fillfood];
			food -= foods[creature.fillfood].food*foodamounts[creature.fillfood];
			creature.totalfood = -food;
			creature.suppliedaffinity = affinity;

		}

		if (creature.tamingmethod == "Non-Violent") {

			for (var i = 0; i < creaturedata.foods.length; i++) {
				
				affinity += foods[creaturedata.foods[i]].affinity*(creature.tamingmultiplier*Taming_Multiplier_Modifier)*creaturedata.nonviolentfoodaffinitymultiplier*foodamounts[creaturedata.foods[i]];
				food -= foods[creaturedata.foods[i]].food*foodamounts[creaturedata.foods[i]];
			}
			foodamounts[creature.fillfood] = Math.max(Math.ceil((creature.requiredaffinity-affinity)/foods[creature.fillfood].affinity/(creature.tamingmultiplier*Taming_Multiplier_Modifier)/creaturedata.nonviolentfoodaffinitymultiplier),0);
			affinity += foods[creature.fillfood].affinity*(creature.tamingmultiplier*Taming_Multiplier_Modifier)*creaturedata.nonviolentfoodaffinitymultiplier*foodamounts[creature.fillfood];
			food -= foods[creature.fillfood].food*foodamounts[creature.fillfood];
			creature.totalfood = -food;
			creature.suppliedaffinity = affinity;

		}		

		$scope.totaltimecalc();
		$scope.effectivenesscalc();
		$scope.starveTimingcalc();

	}

	$scope.totaltimecalc = function() {
		creature = $scope.creature;
		creaturedata = $scope.creatures[creature.name];
		if (creature.tamingmethod == "Standard") {
			$scope.totaltime = food/creaturedata.foodrate/creature.foodratemultiplier;
			$scope.narcoticscalc();
		}

		if (creature.tamingmethod == "Non-Violent") {
			$scope.totaltime = food/creaturedata.foodrate/creature.foodratemultiplier/creaturedata.nonviolentfoodratemultiplier;
		}
	}

	$scope.narcoticscalc = function() {
		var narcoticsmethod = $scope.narcoticsmethods[$scope.narcotics.narcoticsmethod];
		$scope.narcotics.buffertime = $scope.creature.torpor/-$scope.creature.torporrate;
		$scope.narcotics.max = Math.ceil($scope.totaltime*-$scope.creature.torporrate/(narcoticsmethod.torpor-$scope.creature.torporrate*narcoticsmethod.time));
		$scope.narcotics.min = Math.max(Math.ceil(($scope.totaltime*-$scope.creature.torporrate-$scope.creature.torpor)/(narcoticsmethod.torpor-$scope.creature.torporrate*narcoticsmethod.time)), 0);
		$scope.narcotics.buffernarcotics = Math.ceil($scope.creature.torpor/narcoticsmethod.torpor);
		$scope.narcotics.narcoticsbuffertime = narcoticsmethod.time*$scope.narcotics.buffernarcotics;
		if ($scope.narcoticsTiming.time == false) {
			$scope.narcoticsTiming.currenttorpor = $scope.creature.torpor;
		}
		$scope.narcoticsTimingcalc();
	}

	$scope.narcoticsTimingcalc = function() {
		var narcoticsmethod = $scope.narcoticsmethods[$scope.narcotics.narcoticsmethod];
		var narcoticstimes = $scope.narcoticsTiming.narcoticstimes;
		$scope.narcoticsTiming.currenttorpor = Math.min($scope.narcoticsTiming.currenttorpor, $scope.creature.torpor);
		var suppliedtime = 0;
		var suppliedtorpor = 0;
		for (method in narcoticstimes) {
			if (!narcoticstimes.hasOwnProperty(method)) {
				continue;
			}
			if ($scope.narcoticsTiming.currenttorpor+suppliedtorpor+(narcoticstimes[method]*narcoticsmethod.rate)>$scope.creature.torpor) {
				//Here we check if the current method brings us over the max possible torpor, and cut off the time if it does
				suppliedtime += ($scope.creature.torpor-$scope.narcoticsTiming.currenttorpor+suppliedtorpor)/narcoticsmethod.rate;
				suppliedtorpor = $scope.creature.torpor-$scope.narcoticsTiming.currenttorpor;
				break;
			} else {
				suppliedtime += narcoticstimes[method];
				suppliedtorpor += narcoticstimes[method]*narcoticsmethod.rate;
			}
		}
		$scope.narcoticsTiming.topupnarcotics = Math.ceil(($scope.creature.torpor-$scope.narcoticsTiming.currenttorpor-suppliedtorpor)/narcoticsmethod.torpor);
		$scope.narcoticsTiming.buffertime = ($scope.narcoticsTiming.currenttorpor+suppliedtorpor)/-$scope.creature.torporrate;
		$scope.narcoticsTiming.narcoticsbuffertime = suppliedtime;

    $scope.saveNarcotics();
    $scope.saveNarcoticsTiming();
	}

	$scope.supplynarcotic = function() {
		var narcoticsmethod = $scope.narcoticsmethods[$scope.narcotics.narcoticsmethod];
		var narcoticstimes = $scope.narcoticsTiming.narcoticstimes;
		narcoticstimes[$scope.narcotics.narcoticsmethod] += $scope.narcoticsTiming.supplynarcoticamount*narcoticsmethod.time;
	}

	$scope.narcoticstimer = function() {
		var narcoticstimes = $scope.narcoticsTiming.narcoticstimes;
		if ($scope.narcoticsTiming.time == true) {
			$scope.narcoticsTiming.intervalid = $interval(function() {
				var narcoticsapplied = false;
				for (method in narcoticstimes) {
					if (!narcoticstimes.hasOwnProperty(method)) {
						continue;
					}
					if (narcoticstimes[method]>0) {
						narcoticstimes[method] = Math.max(0, narcoticstimes[method]-1);
						$scope.narcoticsTiming.currenttorpor += $scope.narcoticsmethods[method].rate;
						if ($scope.narcoticsTiming.currenttorpor>$scope.creature.torpor) {
							$scope.narcoticsTiming.currenttorpor = $scope.creature.torpor;
							for (method in narcoticstimes) {
								narcoticstimes[method] = 0;
							}
						}
						narcoticsapplied = true;
						break;
					}
				}
				if (!narcoticsapplied) {
					$scope.narcoticsTiming.currenttorpor += $scope.creature.torporrate;
				}
				$scope.narcoticsTimingcalc();
				if ($scope.narcoticsTiming.currenttorpor <= 0) {
					$scope.narcoticsTiming.currenttorpor = 0;
					$scope.narcoticsTimingcalc();
					$scope.narcoticsTiming.time = false;
					$scope.narcoticstimer();
				}
				if ($scope.narcoticsTiming.alarm == 1 && $scope.narcoticsTiming.buffertime / 60 < $scope.narcoticsTiming.alarmthreshold) {
					$scope.narcoticsTiming.alarm = 0;
          Audio_Alarm.volume = Audio_Volume;
					Audio_Alarm.play();
				}
			}, 1000);
		} else {
			$interval.cancel($scope.narcoticsTiming.intervalid);
			$scope.narcoticsTiming.intervalid = null;
		}
	}

	$scope.starveTimingcalc = function() {
		var timedfoodamount = Math.min($scope.creature.totalfood, $scope.starveTiming.maxfood); //We time either the total food required for tame or the max food the dino has, whichever is lower
		if ($scope.starveTiming.currentfood>$scope.starveTiming.maxfood) {
			scope.starvetiming.currentfood = $scope.starveTiming.maxfood;
		}
		$scope.starveTiming.starvetime = (timedfoodamount-($scope.starveTiming.maxfood-$scope.starveTiming.currentfood))/-$scope.creatures[$scope.creature.name].foodrate/$scope.creature.foodratemultiplier;
		$scope.starveTiming.starvetime = Math.max($scope.starveTiming.starvetime, 0); //We get a negative time if the target food has already been passed, replace with 0 instead
		$scope.starveTiming.tametime = ($scope.creature.totalfood-($scope.starveTiming.maxfood-$scope.starveTiming.currentfood))/-$scope.creatures[$scope.creature.name].foodrate/$scope.creature.foodratemultiplier;
		$scope.starveTiming.tametime = Math.max($scope.starveTiming.tametime, 0); //We get a negative time if the target food has already been passed, replace with 0 instead
    $scope.saveStarveTiming();
	}

	$scope.starvetimer = function() {
		if ($scope.starveTiming.time == true) {
			$scope.starveTiming.intervalid = $interval(function() {
				$scope.starveTiming.currentfood += $scope.creatures[$scope.creature.name].foodrate*$scope.creature.foodratemultiplier;
				$scope.starveTimingcalc();
				/*if ($scope.starveTiming.currentfood <= 0) {
					$scope.starveTiming.currentfood = 0;
					$scope.starveTimingcalc();
					$scope.starveTiming.time = false;
					$scope.starvetimer();
				}*/
				if ($scope.starveTiming.alarm == 1 && $scope.starveTiming.starvetime / 60 < $scope.starveTiming.alarmthreshold) {
					$scope.starveTiming.alarm = 0;
          Audio_Alarm.volume = Audio_Volume;
					Audio_Alarm.play();
				}
			}, 1000);
		} else {
			$interval.cancel($scope.starveTiming.intervalid);
			$scope.starveTiming.intervalid = null;
		}
	}

	$scope.effectivenesscalc = function() {
		var foods = $scope.foods;
		var foodprioritylist = $scope.foodprioritylist;
		var foodamounts = $scope.foodamounts;
		var creature = $scope.creature;
		var creaturedata = $scope.creatures[creature.name];
		var effectiveness = 100;
		var fedfood = {};
		for (var food in $scope.foods) {
			fedfood[food] = 0;
		}

		if (creature.tamingmethod == "Standard") {

			for (var i = 0; i < foodprioritylist.length; i++) {
				var food = foodprioritylist[i];
				while (fedfood[food]<foodamounts[food]) {
					fedfood[food]++;
					effectiveness -= Math.pow(effectiveness, 2)*creaturedata.tameIneffectivenessByAffinity/foods[food].affinity/creature.tamingmultiplier/100;
				}
			}

		}

		if (creature.tamingmethod == "Non-Violent") {

			for (var i = 0; i < foodprioritylist.length; i++) {
				var food = foodprioritylist[i];
				while (fedfood[food]<foodamounts[food]) {
					fedfood[food]++;
					effectiveness -= Math.pow(effectiveness, 2)*creaturedata.tameIneffectivenessByAffinity/foods[food].affinity/creature.tamingmultiplier/creaturedata.nonviolentfoodaffinitymultiplier/100;
				}
			}

		}
		creature.effectiveness = effectiveness;
		creature.extralevels = Math.floor(creature.level*0.5*creature.effectiveness/100);
	}

	$scope.knockoutcalc = function() {
		var komethod = $scope.komethods[$scope.ko.komethod];
		$scope.ko.koquantities = {};

		$scope.ko.searchkomethod = $scope.ko.komethod; //Ensure the searchname is kept up to date

		for (hitbox in $scope.creatures[$scope.creature.name].hitboxes) {
			var torpor = komethod.torpor*$scope.creatures[$scope.creature.name].hitboxes[hitbox];
			var damage = komethod.damage*$scope.creatures[$scope.creature.name].hitboxes[hitbox];
			if (komethod.usesmeleedam) {
				torpor *= $scope.ko.komeleedam/100;
				damage *= $scope.ko.komeleedam/100;
			}
			if (komethod.usesweapondam) {
				torpor *= $scope.ko.koweapondam/100;
				damage *= $scope.ko.koweapondam/100;
			}
			for (i = 0; i<komethod.damagetypes.length; i++) {
				if (komethod.damagetypes[i] in $scope.creatures[$scope.creature.name].damagemultipliers) {
					torpor *= $scope.creatures[$scope.creature.name].damagemultipliers[komethod.damagetypes[i]];
					damage *= $scope.creatures[$scope.creature.name].damagemultipliers[komethod.damagetypes[i]];
				}
			}
			$scope.ko.kotorpor[hitbox] = torpor;
			$scope.ko.kodamage[hitbox] = damage;
			$scope.ko.koquantities[hitbox] = Math.ceil($scope.creature.torpor/torpor);
			$scope.ko.kotimes[hitbox] = $scope.ko.koquantities[hitbox]*komethod.time;
		}

		var now = new Date();
		$cookies.putObject(Cookies_Prefix + 'ko', $scope.ko, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())});

		/*for (hitbox in $scope.creatures[$scope.creature.name].hitboxes) {
			$scope.ko.koquantities[hitbox] = Math.ceil($scope.creature.torpor/$scope.komethodtorpor[$scope.ko.komethod]/$scope.creatures[$scope.creature.name].projectiledamage/$scope.ko.kodamagemultiplier/$scope.creatures[$scope.creature.name].hitboxes[hitbox]);
			$scope.ko.kotimes[hitbox] = $scope.ko.koquantities[hitbox]*5;
		}*/
		/*if ($scope.creatures[$scope.creature.name].projectiledamage>1 && "Head" in $scope.creatures[$scope.creature.name].hitboxes) {
			var headshots = $scope.ko.koquantities["Head"]-1;
			var bodyshots = $scope.ko.koquantities["Body"]-(headshots*$scope.creatures[$scope.creature.name].hitboxes["Head"]);
			$scope.ko.koquantities["Head+Body"] = headshots+"+"+bodyshots;
			$scope.ko.kotimes["Head+Body"] = (headshots+bodyshots)*5;
		}*/
	}

	$scope.resetfoods();
	$scope.selectdino();
	$scope.maxfoodcalc();
	$scope.alltimescalc();
	$scope.foodcalc();
  $scope.showTameDetails();
	$rootScope.pagetitle = "Crumplecorn: Evolved";

}]);
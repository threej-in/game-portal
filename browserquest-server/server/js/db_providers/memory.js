var cls = require("../lib/class"),
    bcrypt = require("bcrypt");

var users = {};

function defaultInventory() {
    return [null, null];
}

function defaultInventoryCounts() {
    return [0, 0];
}

function defaultAchievements() {
    return [false, false, false, false, false, false, false, false];
}

function defaultAchievementProgress() {
    return [0, 0, 0, 0, 0, 0, 0, 0];
}

module.exports = DatabaseHandler = cls.Class.extend({
    init: function() {},

    loadPlayer: function(player) {
        var record = users[player.name];

        if(!record) {
            player.connection.sendUTF8("invalidlogin");
            player.connection.close("User does not exist: " + player.name);
            return;
        }

        bcrypt.compare(player.pw, record.pw, function(err, matches) {
            if(err || !matches) {
                player.connection.sendUTF8("invalidlogin");
                player.connection.close("Wrong Password: " + player.name);
                return;
            }

            player.sendWelcome(
                record.armor,
                record.weapon,
                record.avatar,
                record.weaponAvatar || record.weapon,
                record.exp || 0,
                null,
                0,
                0,
                record.inventory || defaultInventory(),
                record.inventoryNumber || defaultInventoryCounts(),
                record.achievementFound || defaultAchievements(),
                record.achievementProgress || defaultAchievementProgress(),
                record.x || player.x,
                record.y || player.y,
                0
            );
        });
    },

    createPlayer: function(player) {
        if(users[player.name]) {
            player.connection.sendUTF8("userexists");
            player.connection.close("Username not available: " + player.name);
            return;
        }

        users[player.name] = {
            pw: player.pw,
            email: player.email,
            armor: "clotharmor",
            avatar: "clotharmor",
            weapon: "sword1",
            weaponAvatar: "sword1",
            exp: 0,
            inventory: defaultInventory(),
            inventoryNumber: defaultInventoryCounts(),
            achievementFound: defaultAchievements(),
            achievementProgress: defaultAchievementProgress(),
            x: player.x,
            y: player.y
        };

        player.sendWelcome(
            "clotharmor",
            "sword1",
            "clotharmor",
            "sword1",
            0,
            null,
            0,
            0,
            defaultInventory(),
            defaultInventoryCounts(),
            defaultAchievements(),
            defaultAchievementProgress(),
            player.x,
            player.y,
            0
        );
    },

    checkBan: function() {},
    banPlayer: function() {},
    chatBan: function() {},
    newBanPlayer: function() {},
    banTerm: function(time) {
        return Math.pow(2, time) * 500 * 60;
    },
    equipArmor: function(name, armor) {
        if(users[name]) users[name].armor = armor;
    },
    equipAvatar: function(name, armor) {
        if(users[name]) users[name].avatar = armor;
    },
    equipWeapon: function(name, weapon) {
        if(users[name]) users[name].weapon = weapon;
    },
    setExp: function(name, exp) {
        if(users[name]) users[name].exp = exp;
    },
    setInventory: function(name, itemKind, inventoryNumber, itemNumber) {
        if(!users[name]) return;
        users[name].inventory[inventoryNumber] = itemKind ? Types.getKindAsString(itemKind) : null;
        users[name].inventoryNumber[inventoryNumber] = itemKind ? itemNumber : 0;
    },
    makeEmptyInventory: function(name, number) {
        if(!users[name]) return;
        users[name].inventory[number] = null;
        users[name].inventoryNumber[number] = 0;
    },
    foundAchievement: function(name, number) {
        if(users[name]) users[name].achievementFound[number - 1] = true;
    },
    progressAchievement: function(name, number, progress) {
        if(users[name]) users[name].achievementProgress[number - 1] = progress;
    },
    setUsedPubPts: function() {},
    setCheckpoint: function(name, x, y) {
        if(!users[name]) return;
        users[name].x = x;
        users[name].y = y;
    },
    loadBoard: function(player) {
        player.send([Types.Messages.BOARD, "list", []]);
    },
    writeBoard: function() {},
    writeReply: function() {},
    pushKungWord: function() {}
});

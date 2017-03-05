var assert = require('assert');
var expect = require('chai').expect;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var ImageDownloader = require('../src/image-downloader');
// var fs = require('fs');
// var username = require('username');

suite('when barmen pours whisky', function () {
    let barmen = new Barmen();
    let me = new Visitor();
    let imageDownloader = new ImageDownloader();

    setup(function () {
        me.sober();
        barmen.free();
    });

    suite('i ask 50 grams', function () {
          test('I get 50 ml whisky', function () {
            var iAskVolume = 50;

            var volumeInGlass = barmen.pour("whisky", iAskVolume);

            assert.equal(iAskVolume, volumeInGlass);
        });

        test('I drink 50 ml whisky', function () {
            var iAskVolume = 50;
            var volumeInGlass = barmen.pour("whisky", iAskVolume);

            me.drink(volumeInGlass);

            assert.equal(50, me.getTotallyDrunk());
        });

        test('i`ll not become drunk after 50 ml whisky', function () {
            var iAskVolume = 50;
            var volumeInGlass = barmen.pour("whisky", iAskVolume);
            me.drink(volumeInGlass);

            assert.equal(false, me.isDrunk());
        });
    });

    suite('i ask 180 grams', function () {
        test('I get 180 ml vodka', function () {
            var iAskVolume = 180;

            var volumeInGlass = barmen.pour("vodka", iAskVolume);

            assert.equal(iAskVolume, volumeInGlass);
        });

        test('I drink 180 ml vodka', function () {
            var iAskVolume = 180;
            var volumeInGlass = barmen.pour("vodka", iAskVolume);

            me.drink(volumeInGlass);

            assert.equal(180, me.getTotallyDrunk());
        });

        test('i`ll become drunk after 50 ml vodka', function () {
            var iAskVolume = 180;
            var volumeInGlass = barmen.pour("vodka", iAskVolume);
            me.drink(volumeInGlass);

            assert.equal(true, me.isDrunk());
        });
    });



    suite('i ask -10 grams', function () {
        test('I get an error', function () {
            var iAskVolume = -10;

            expect(() => barmen.pour("whisky", iAskVolume)).to.throw(/Invalid volume of whisky/);
        });
    });

    suite('i ask 500 grams', function () {
        test('Barmen said there is no such glass', function () {
            var iAskVolume = 500;

            expect(() => barmen.pour("whisky", iAskVolume)).to.throw(/There is no such glass/);
        })
    });

    teardown(function () {

    })
});
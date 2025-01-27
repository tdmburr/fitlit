import { expect } from 'chai';
import Sleep from '../src/data/sleep';
import sleepTestData from '../test/sleep-test-data';


describe('Sleep', function() {
let sleep;

  this.beforeEach(() => {
    sleep = new Sleep(sleepTestData);
  })

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  })

  it('should be an instance of sleep', function() {
    expect(sleep).to.be.an.instanceOf(Sleep);
  })

  it('should take in a user ID', function() {
    expect(sleep.sleepData[0].userID).to.equal(1);
  });

  it('should take in a date', function() {
    expect(sleep.sleepData[0].date).to.equal("2023/03/24");
  });

  it('should take in a user hours slept', function() {
    expect(sleep.sleepData[0].hoursSlept).to.equal(9.6);
  });

  it('should take in a user sleep quality', function() {
    expect(sleep.sleepData[0].sleepQuality).to.equal(4.3);
  });

  it('should be able to average user\'s sleep', function() {
    expect(sleep.getAvgSleep(1)).to.equal(6.6);
    expect(sleep.getAvgSleep(2)).to.equal(8.1);
  });

  it('should be able to average user\'s sleep quality', function() {
    expect(sleep.getAvgQuality(1)).to.equal(3.6);
    expect(sleep.getAvgQuality(2)).to.equal(3.3);
  });

  it('should be able to get user\'s hours slept by day', function() {
    expect(sleep.getHoursByDay(1, '2023/03/24')).to.equal(9.6);
    expect(sleep.getHoursByDay(1, '2023/03/29')).to.equal(5.6);
    expect(sleep.getHoursByDay(2, '2023/03/25')).to.equal(8.1);
    expect(sleep.getHoursByDay(2, '2023/03/28')).to.equal(5.1);
  });

  it('should be able to get user\'s sleep quality by day', function() {
    expect(sleep.getQualityByDay(1, '2023/03/24')).to.equal(4.3);
    expect(sleep.getQualityByDay(1, '2023/03/29')).to.equal(2.1);
    expect(sleep.getQualityByDay(2, '2023/03/25')).to.equal(4.7);
    expect(sleep.getQualityByDay(2, '2023/03/28')).to.equal(2.1);
  });
  
  it('should be able to get user\'s weekly sleep data', function() {
    expect(sleep.getWeekSleep(1, '2023/03/30')).to.deep.equal([
    {'date': '2023/03/30', 'hoursSlept': '6.2 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '3.3'},
    {'date': '2023/03/29', 'hoursSlept': '5.6 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '2.1'}, 
    {'date': '2023/03/28', 'hoursSlept': '6 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '4.6'},
    {'date': '2023/03/27', 'hoursSlept': '7.1 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '4.7'},
    {'date': '2023/03/26', 'hoursSlept': '5.4 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '3.1'},
    {'date': '2023/03/25', 'hoursSlept': '6.3 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '3.3'},
    {'date': '2023/03/24', 'hoursSlept': '9.6 hours slept', 'sleepQuality': ' a sleep quality rating of ' + '4.3'}
  ])});
});
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartMeter {
    struct MeterData {
        uint256 energyConsumed;
        uint256 cost;
        uint256 timestamp;
    }

    mapping(uint256 => MeterData[]) public meterData;
    mapping(uint256 => uint256) public priceHistory; // key:value = timestamp:price

    event DataRecorded(uint256 meterId, uint256 energyConsumed, uint256 cost, uint256 timestamp);
    //DataRecorded: This event is emitted when new data is recorded for a meter. It includes the meter ID, energy consumed, cost, and timestamp.
    event PriceUpdated(uint256 timestamp, uint256 price);

    function setPrice(uint256 _timestamp, uint256 _price) public {
        priceHistory[_timestamp] = _price;
        emit PriceUpdated(_timestamp, _price);
    }

    //records energy consumption data for a specific meter at a particular timestamp.
    //function first checks if the price for the given timestamp is set (via the priceHistory mapping). 
    //if the price aint set, it throws an error.
    //it calculates the cost of the energy consumed by multiplying _energyConsumed by the price at that timestamp.

    function recordData(uint256 _meterId, uint256 _energyConsumed, uint256 _timestamp) public {
        uint256 price = priceHistory[_timestamp];
        require(price > 0, "Price not set for this timestamp");

        uint256 cost = _energyConsumed * price;
        MeterData memory data = MeterData({
            energyConsumed: _energyConsumed,
            cost: cost,
            timestamp: _timestamp
        });

        meterData[_meterId].push(data);
        emit DataRecorded(_meterId, _energyConsumed, cost, _timestamp);
    }

    function getMeterData(uint256 _meterId) public view returns (MeterData[] memory) {
        return meterData[_meterId];
    }
}

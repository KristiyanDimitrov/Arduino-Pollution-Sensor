#!/usr/bin/env node

'use strict'

const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

console.log('\x1b[36m%s\x1b[0m', 'an MQTT Client')

client.on('connect', () => client.subscribe('205CDE/XXX'))

client.on('message', (topic, message) => {
    console.log(topic)
    console.log(`\t${message.toString()}`)
})
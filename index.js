const argv = require('optimist').argv;
const AWS = require('aws-sdk');

const AWS_API_VERSION = '2016-11-15';
const INSTANCE_ID = '';
const INSTANCE_REGION = '';
const AWS_SECRET = '';
const AWS_ACCESS_KEY_ID = '';

const instanceIds = { InstanceIds: [INSTANCE_ID] };
const ec2 = new AWS.EC2(
    {
        apiVersion: AWS_API_VERSION,
        secretAccessKey: AWS_SECRET,
        accessKeyId: AWS_ACCESS_KEY_ID,
        region: INSTANCE_REGION
    }
);

if (argv.instance) setInstanceType(argv.instance);

async function setInstanceType(instanceType) {
    await stopInstance();
    await waitForInstanceToBeStopped();
    await modifyInstanceType(instanceType);
    startInstance();
}

function modifyInstanceType(instanceType) {
    console.log('Modifying instance type to: ', instanceType);
    return ec2.modifyInstanceAttribute({
        InstanceId: INSTANCE_ID,
        InstanceType: {
            Value: instanceType
        }
    }).promise();
}

function waitForInstanceToBeStopped() {
    return ec2.waitFor('instanceStopped', instanceIds).promise();
}

function stopInstance() {
    console.log('Stopping instance...');
    return ec2.stopInstances(instanceIds).promise();
}

function startInstance() {
    console.log('Starting instance...');
    return ec2.startInstances(instanceIds).promise();
}


## Modify EC2 instance type
---
It's not possible in AWS to modify an EC2 instance without stopping it, which can be a bit time consuming. This script automates the process by executing a simple command in the cli.

You will need node.js to run it.


## Installation

1. Clone the project `git clone https://github.com/azorvk/aws-modify-ec2-instance-type.git`.
2. Install dependencies `npm i`.
3. Set the right configuration in `modify-ec2-instance.js`.

## Run

Run ``node modify-instance-type.js --instance t2.medium``, where 't2.medium' is the instance type that you want.
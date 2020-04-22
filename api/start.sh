#!/bin/bash

source venv/bin/activate
nohup python spray_api.py &
deactivate

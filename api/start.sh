#!/bin/bash

source venv/bin/activate
python spray_api.py
nohup python spray_api.py &
deactivate

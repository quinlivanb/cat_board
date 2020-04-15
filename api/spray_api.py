from flask import Flask
from flask import jsonify
from sql_calls import get_card_counts, get_events_weekly, get_events_daily, get_all_events
app = Flask(__name__)


@app.route("/weekly_data")
def weekly_data():
    output = get_events_weekly()
    return jsonify(output)


@app.route("/daily_data")
def daily_data():
    output = get_events_daily()
    return jsonify(output)


@app.route("/card_counts")
def card_counts():
    output = get_card_counts()
    return jsonify(output)


@app.route("/time_series")
def time_series():
    output = get_all_events()
    return jsonify(output)


if __name__ == "__main__":
    app.run()

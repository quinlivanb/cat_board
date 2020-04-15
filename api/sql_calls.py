import sqlite3
from sqlite3 import Error
from datetime import datetime, timedelta


def create_connection():
    """ create a database connection to the SQLite database
        specified by db_file
    :return: Connection object or None
    """
    db_file = '/Users/brendan/PycharmProjects/cat_sprayer/cat_sprayer_db.db'
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def get_card_counts():
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    today_start = datetime.now().date()
    week_start = today_start - timedelta(days=today_start.weekday())

    today_start = today_start.strftime("%m-%d-%Y %H:%M:%S")
    week_start = week_start.strftime("%m-%d-%Y %H:%M:%S")

    # events today
    conn = create_connection()

    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM events WHERE date_time > ?", (today_start,))
    today = cur.fetchall()[0][0]

    # events this week
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM events WHERE date_time > ?", (week_start,))
    this_week = cur.fetchall()[0][0]

    # events all time
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM events")
    all_time = cur.fetchall()[0][0]

    conn.close()
    return [today, this_week, all_time]


def get_events_weekly():
    # events today
    conn = create_connection()

    cur = conn.cursor()
    cur.execute("SELECT strftime('%w', date_time) as day, COUNT(*) "
                "FROM events "
                "GROUP BY day ")
    daily_events = cur.fetchall()

    print(daily_events)

    output = []
    for idx, result in enumerate(daily_events):
        output.append({"id": str(idx), "label": result[0], "value": result[1]})

    conn.close()
    return output


def get_events_daily():
    # events today
    conn = create_connection()

    cur = conn.cursor()

    sql = '''
            select
            sum(case when strftime('%w', date_time) < 12 then 1 else 0 end),
            sum(case when strftime('%w', date_time) >= 12 and strftime('%w', date_time) < 17 then 1 else 0 end),
            sum(case when strftime('%w', date_time) >= 17 and strftime('%w', date_time) < 22 then 1 else 0 end),
            sum(case when strftime('%w', date_time) >= 22 then 1 else 0 end)
            from events; 
            '''

    cur.execute(sql)
    daily_events = cur.fetchall()

    labels = ['Morning', 'Afternoon', 'Evening', 'Night']

    output = []
    for idx, lab in enumerate(labels):
        output.append({"id": str(idx), "label": lab, "value": daily_events[0][idx]})

    conn.close()
    return output


def get_all_events():
    # events today
    conn = create_connection()

    cur = conn.cursor()
    cur.execute("SELECT strftime('%m-%d-%Y', date_time) as day, COUNT(*) "
                "FROM events "
                "GROUP BY day ")
    daily_events = cur.fetchall()

    data = []
    for idx, result in enumerate(daily_events):
        data.append({"x": result[0], "y": result[1]})

    output = {"id": "daily_events", "data": data}

    conn.close()
    return [output]

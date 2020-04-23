import sqlite3
from sqlite3 import Error
from datetime import datetime, timedelta, date
from os import environ


def create_connection():
    """ create a database connection to the SQLite database
        specified by db_file
    :return: Connection object or None
    """
    db_file = '../../cat_sprayer/cat_sprayer_db.db'
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

    today_start = today_start.strftime("%Y-%m-%d %H:%M:%S")
    week_start = week_start.strftime("%Y-%m-%d %H:%M:%S")

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

    mapping = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'}

    output = []
    for idx, result in enumerate(daily_events):
        output.append({"id": str(idx), "label": mapping[int(result[0])], "value": result[1]})

    conn.close()
    return output


def get_events_daily():
    # events today
    conn = create_connection()

    cur = conn.cursor()

    sql = '''
            select
            sum(case when cast(strftime('%H', date_time) as integer) < 12 then 1 else 0 end),
            sum(case when cast(strftime('%H', date_time) as integer) >= 12 and 
            cast(strftime('%H', date_time) as integer) < 17 then 1 else 0 end),
            sum(case when cast(strftime('%H', date_time) as integer) >= 17 and 
            cast(strftime('%H', date_time) as integer) < 22 then 1 else 0 end),
            sum(case when cast(strftime('%H', date_time) as integer) >= 22 then 1 else 0 end)
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
    cur.execute("SELECT strftime('%Y-%m-%d', date_time) as day, COUNT(*) "
                "FROM events "
                "GROUP BY day "
                "ORDER BY day")
    daily_events = cur.fetchall()

    data = []
    date_list = []
    for idx, result in enumerate(daily_events):
        data.append({"x": result[0], "y": result[1]})
        date_list.append(result[0])

    # fill in zero values
    start_date = datetime.strptime('2020-04-16', "%Y-%m-%d").date()
    end_date = date.today()
    for single_date in daterange(start_date, end_date):
        cur_date = single_date.strftime("%Y-%m-%d")
        if cur_date not in date_list:
            data.append({"x": cur_date, "y": 0})

    # sort data by late
    data = sorted(data, key=lambda k: k['x'])

    output = {"id": "daily_events", "data": data}

    conn.close()
    return [output]


def get_cal_events():
    # events today
    conn = create_connection()

    cur = conn.cursor()
    cur.execute("SELECT strftime('%Y-%m-%d', date_time) as day, COUNT(*) "
                "FROM events "
                "GROUP BY day ")
    daily_events = cur.fetchall()

    output = []
    for idx, result in enumerate(daily_events):
        output.append({"day": result[0], "value": result[1]})

    conn.close()
    return output


class PreSignedUrl:
    def __init__(self):
        self.url = 'generate pre_signed_url'

    def get_latest_video_url(self):

        if environ.get('LATEST_URL') is None:
            latest_url = self.generate_new_url()
            environ['LATEST_URL'] = latest_url
            return latest_url

        else:
            latest_url = environ.get('LATEST_URL')
            # check if expired
            is_valid = False

            if is_valid:
                return latest_url

            else:
                latest_url = self.generate_new_url()
                environ['LATEST_URL'] = latest_url
                return latest_url

    def generate_new_url(self):
        return self.url


def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)



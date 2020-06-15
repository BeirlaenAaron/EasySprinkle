from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens

    @staticmethod
    def update_waarde_sensor_by_id(deviceid, waarde):
        sql = "INSERT INTO Meting (DeviceID, Waarde, TijdMeting) VALUES (%s, '%s', NOW());"
        params = [deviceid, waarde]
        return Database.execute_sql(sql, params)

    @staticmethod
    def insert_status(status):
        sql = "INSERT INTO Actie (DeviceID, Status, TijdActie) VALUES ('VALVE1', %s, NOW());"
        params = [status]
        return Database.execute_sql(sql, params)

    @staticmethod
    def lees_waarde_sensor_by_id(deviceid):
        sql = "SELECT Waarde FROM EasySprinkledb.Meting WHERE DeviceID = %s ORDER BY TijdMeting DESC LIMIT 1;"
        params = [deviceid]
        return Database.get_one_row(sql, params)

    @staticmethod
    def lees_logs():
        sql = "SELECT Status, DATE_FORMAT(TijdActie, '%d/%m') as 'Date' , DATE_FORMAT(TijdActie,'%H:%i') as 'Time' FROM Actie ORDER BY TijdActie DESC LIMIT 10"
        return Database.get_rows(sql)

    @staticmethod
    def lees_temperatuur_grafiek():
        sql = "SELECT avg(waarde) as 'Waarde' , DATE_FORMAT(TijdMeting, '%d/%m') as 'Date' FROM EasySprinkledb.Meting WHERE DeviceID = 'TEMP' GROUP BY YEAR(TijdMeting), MONTH(TijdMeting), DAY(TijdMeting) ORDER BY TijdMeting DESC LIMIT 5;"
        return Database.get_rows(sql)

    @staticmethod
    def lees_water_grafiek():
        sql = "SELECT avg(waarde) as 'Waarde' , DATE_FORMAT(TijdMeting, '%d/%m') as 'Date' FROM EasySprinkledb.Meting WHERE DeviceID = 'WATER' GROUP BY YEAR(TijdMeting), MONTH(TijdMeting), DAY(TijdMeting) ORDER BY TijdMeting DESC LIMIT 5;"
        return Database.get_rows(sql)

    @staticmethod
    def lees_vochtigheid_grafiek():
        sql = "SELECT avg(waarde) as 'Waarde' , DATE_FORMAT(TijdMeting, '%d/%m') as 'Date' FROM EasySprinkledb.Meting WHERE DeviceID = 'MOIST' GROUP BY YEAR(TijdMeting), MONTH(TijdMeting), DAY(TijdMeting) ORDER BY TijdMeting DESC LIMIT 5;"
        return Database.get_rows(sql)

    @staticmethod
    def lees_status():
        sql = "SELECT Status FROM EasySprinkledb.Actie ORDER BY TijdActie DESC LIMIT 1"
        return Database.get_one_row(sql)

    # @staticmethod
    # def read_status_lampen():
    #     sql = "SELECT * from lampen"
    #     return Database.get_rows(sql)

    # @staticmethod
    # def read_status_lamp_by_id(id):
    #     sql = "SELECT * from lampen WHERE id = %s"
    #     params = [id]
    #     return Database.get_one_row(sql, params)

    # @staticmethod
    # def update_status_lamp(id, status):
    #     sql = "UPDATE lampen SET status = %s WHERE id = %s"
    #     params = [status, id]
    #     return Database.execute_sql(sql, params)

    # @staticmethod
    # def update_status_alle_lampen(status):
    #     sql = "UPDATE lampen SET status = %s"
    #     params = [status]
    #     return Database.execute_sql(sql, params)

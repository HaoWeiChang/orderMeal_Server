/*活動參與點餐紀錄*/
select 
om.history_id,
u.id as user_id,
u.name as userName,
m.name as mealName,
m.price as mealPrice,
m.note as mealNote,
om.num as orderNum
From meal as m
Join (select * from ordermeal) as om
ON m.id = om.meal_id AND activity_id = 96 AND om.user_id =1
Join (select * from account) as u
ON u.id = om.user_id;

/*檢視活動內的所有參與訂單*/
select 
om.history_id,
u.id as user_id,
u.name as userName,
GROUP_CONCAT(m.name) as mealName,
GROUP_CONCAT(m.note) as mealNote,
GROUP_CONCAT(m.price) as mealPrice,
GROUP_CONCAT(om.num) as orderNum,
SUM(m.price*om.num) as total
From meal as m
INNER Join (select * from ordermeal) as om
ON m.id = om.meal_id AND activity_id = 96
INNER Join (select * from account) as u
ON u.id = om.user_id
Group by om.history_id,u.id;

/*活動清單顯示是否已經有點餐紀錄*/
Select
a.id,
a.subject,
a.store_id,
s.name as storeName,
a.user_id,
u.name as initiator,
a.createtime,
a.endtime,
h.id as historyID
From account As u
Join (Select * From activity) As a
ON a.user_id = u.id AND a.endtime >'2022/1/4' AND a.Isdelete =false
left Join (select * From orderhistory) as h
on a.id = h.activity_id AND h.user_id = ""
Join (Select * From store Where valid = false) As s
ON s.id = a.store_id
Group by a.id
Order by a.createtime DESC, a.endtime;
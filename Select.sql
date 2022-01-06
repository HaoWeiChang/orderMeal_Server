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
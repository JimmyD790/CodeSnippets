/**
18:26:19	DELETE FROM ly_shakearound_page_device  WHERE     page_id IS NOT NULL	
Error Code: 1175. You are using safe update mode and you tried to update a table 
without a WHERE that uses a KEY column To disable safe mode, 
toggle the option in Preferences -> SQL Editor and reconnect.	0.0011 sec
 */
SET SQL_SAFE_UPDATES=0;
DELETE FROM ly_shakearound_page_device 
WHERE
    page_id IS NOT NULL;
SET SQL_SAFE_UPDATES=1;
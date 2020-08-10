INSERT INTO `sites`(`link_id`, `site_name`, `beam_id`, `service_id`, `svno_id`, `modem_id`, `serial_number`, `mac_air`, 
`longitude`, `latitude`, `status_id`, `start_online`, `project_id`, `terminal_name`, `link_portal`) VALUES 
('203141VS031-003','Palm Plantation','1',(SELECT `service_id` from `services` where `service_name`='Gigstarter 20/5'),
(SELECT `svno_id` from `svno` WHERE `svno`='kacific'),(SELECT `modem_id` from `modem` WHERE `modem`='Newtec 2510'),'7293900301487',
'00:06:39:8c:7d:1c','132.94222222','-2.71194444',(SELECT `status_id` from `status` WHERE `status`='online'),
'2020-07-01','203141-2020-03-031','RT_JAV1-5-Palm-Plantation','#')
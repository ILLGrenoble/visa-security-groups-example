CREATE TABLE security_group (
    id       bigint primary key,
    name     text not null
);

CREATE TABLE security_group_filter (
    id                  bigint primary key,
    security_group_id   bigint,
    object_id           bigint,
    object_type         text
);

INSERT INTO security_group (id, name) VALUES (1000, 'COMMON_SG');
INSERT INTO security_group (id, name) VALUES (1001, 'I1_SG');
INSERT INTO security_group (id, name) VALUES (1002, 'I2_SG');
INSERT INTO security_group (id, name) VALUES (1003, 'I3_SG');
INSERT INTO security_group (id, name) VALUES (1004, 'I4_SG');
INSERT INTO security_group (id, name) VALUES (1005, 'ADMIN_SG');
INSERT INTO security_group (id, name) VALUES (1006, 'STAFF_SG');

INSERT INTO security_group_filter (id, security_group_id, object_id, object_type) VALUES (1001, 1001, 1, 'INSTRUMENT');
INSERT INTO security_group_filter (id, security_group_id, object_id, object_type) VALUES (1002, 1002, 2, 'INSTRUMENT');
INSERT INTO security_group_filter (id, security_group_id, object_id, object_type) VALUES (1003, 1003, 3, 'INSTRUMENT');
INSERT INTO security_group_filter (id, security_group_id, object_id, object_type) VALUES (1004, 1004, 4, 'INSTRUMENT');
INSERT INTO security_group_filter (id, security_group_id, object_id, object_type) VALUES (1005, 1005, 1000, 'ROLE');
INSERT INTO security_group_filter (id, security_group_id, object_id, object_type) VALUES (1006, 1006, 1001, 'ROLE');

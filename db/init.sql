# CREATE TABLE spaceData (
#   id varchar(255) NOT NULL,
#   spaceItem varchar(8000) NOT NULL,
#   PRIMARY KEY (id)
# );

CREATE TABLE ships (
  id varchar(255) NOT NULL,
  type varchar(32) NOT NULL, # Barge, Cargo, High Speed Craft, Tug
  mass_kg int DEFAULT NULL,
  home_port varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  class int DEFAULT NULL,
  image varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)


CREATE TABLE User (
     id INT NOT NULL AUTO_INCREMENT,
     fullName VARCHAR(50) NOT NULL,
     email VARCHAR(50) NOT NULL,
     password VARCHAR(50) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT PK_User PRIMARY KEY (id)
);


CREATE TABLE Task (
     id INT NOT NULL AUTO_INCREMENT,
     userId INT NOT NULL,
     title VARCHAR(50) NOT NULL,
     description VARCHAR(50) NOT NULL,
     status BOOLEAN DEFAULT false,
     determinedAt TIMESTAMP ,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT PK_Task PRIMARY KEY (id),
    CONSTRAINT FK_Task FOREIGN KEY (userId) REFERENCES User(id)
        ON DELETE CASCADE
);


CREATE TABLE Event (
     id INT NOT NULL AUTO_INCREMENT,
     userId INT NOT NULL,
     title VARCHAR(50) NOT NULL,
     description VARCHAR(50) NOT NULL,
      locLongitude DECIMAL ,
      locLatitude DECIMAL ,
      type VARCHAR(8),
      startingAt TIMESTAMP,
      finishedAt TIMESTAMP,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT PK_Event PRIMARY KEY (id),
    CONSTRAINT FK_Event FOREIGN KEY (userId) REFERENCES User(id)
        ON DELETE CASCADE
);




CREATE TABLE EventGroup (
     userId INT NOT NULL,
     eventId INT NOT NULL,     
     role VARCHAR(10) NOT NULL,
     ownerId INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT PK_Composite_EventGroup PRIMARY KEY (userId,eventId),
    
    CONSTRAINT FK_EventGroup_User FOREIGN KEY (userId) REFERENCES User(id)
        ON DELETE CASCADE,

        CONSTRAINT FK_EventGroup_OwnerUser FOREIGN KEY (ownerId) REFERENCES User(id)
        ON DELETE CASCADE,

       CONSTRAINT FK_EventGroup_Event FOREIGN KEY (eventId) REFERENCES Event(id)
        ON DELETE CASCADE     


);


/* 

INSERT INTO User (fullName,email,password) VALUES ('abdallah','abd@gmail.com','123456');


INSERT INTO Event (userId,title,description,locLongitude,locLatitude) VALUES (1.'hi there','nice',93.65,56.124);

INSERT INTO EventGroup (userId,eventId,role,ownerId) VALUES (1,1,'admin',1);

*/



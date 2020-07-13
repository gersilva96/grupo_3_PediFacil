INSERT INTO `roles` VALUES
    (1,'Administrador','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (2,'Vendedor','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (3,'Comprador','2020-07-13 13:55:39','2020-07-13 13:55:39');

INSERT INTO `categories` VALUES
    (1,'Carnes y pescados','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (2,'Frutas y verduras','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (3,'Bebidas','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (4,'Almacén','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (5,'Limpieza','2020-07-13 13:55:39','2020-07-13 13:55:39');

INSERT INTO `statuses` VALUES
    (1,'Pendiente','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (2,'En proceso','2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (3,'Finalizada','2020-07-13 13:55:39','2020-07-13 13:55:39');

INSERT INTO `users` VALUES
    (1,'Pedí Fácil','gersilva96@hotmail.com','Germán','Silva','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','img-user-1.png',1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (2,'Pedí Fácil','espinosarodrigo177@gmail.com','Rodrigo','Espinosa','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','img-user-2.jpg',1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (3,'Pedí Fácil','gagc@protonmail.ch','Guillermo','Gonzales','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','img-user-3.jpg',1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (4,'Pedí Fácil','edu.andreu747@gmail.com','Eduardo','Andreu','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','img-user-4.jpg',1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (5,'Distrubuidora','distribuidora@mail.com','Vendedor','Uno','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','avatar-default.png',2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (6,'Almacén','almacen@mail.com','Vendedor','Dos','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','avatar-default.png',2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (7,'Verdulería','verduleria@mail.com','Vendedor','Tres','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','avatar-default.png',2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (8,'Carnicería y pescadería','carniceria@mail.com','Vendedor','Cuatro','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','avatar-default.png',2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (9,'Digital House','ccia@digitalhouse.com','Carolina','Cia','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','img-user-9.jpg',3,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (10,'Digital House','jesus@digitalhouse.com','Jesús','Arce','$2b$10$IqLy8zP4mAxBNjnVXnkaqO0pIVOWZD9xOuCbGiKPWo6Md4FJoKmpW','img-user-10.jpg',3,'2020-07-13 13:55:39','2020-07-13 13:55:39');

INSERT INTO `products` VALUES
    (1,1534000001,'Cerveza Heineken 1 L','Cerveza Rubia heineken 1L no retornable',82.90,0,500,'img-prod-code1534000001.jpg',5,3,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (2,1534000002,'Coca Cola 2.25 L','Coca Cola Sabor Original 2.25 L',147.00,0,600,'img-prod-code1534000002.jpg',5,3,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (3,1534000003,'Bonaqua Sin Gas 1.5 L','Bonaqua Agua Sin Gas 1.5 L',58.00,0,450,'img-prod-code1534000003.jpg',5,3,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (4,1534000004,'Vino Tinto Luigi Bosca 750 Cc','Vino Tinto Luigi Bosca Reserva Malbec 750 Cc',755.00,0,800,'img-prod-code1534000004.jpg',5,3,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (5,1534000005,'Pollo Fresco Por Kg','Pollo Fresco Con Menudos Por Kg',108.00,0,390,'img-prod-code1534000005.jpg',8,1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (6,1534000006,'Asado Premium Por Kg','Asado Premium Por Kg',526.00,0,666,'img-prod-code1534000006.jpg',8,1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (7,1534000007,'Chorizo Parrillero Cabaña Argentina 435 Gr','Chorizo Parrillero Cabaña Argentina 435 Gr',179.00,0,400,'img-prod-code1534000007.jpg',8,1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (8,1534000008,'Mix De Mariscos Superbé 400 Gr','Mix De Mariscos Superbé 400 Gr',499.00,0,700,'img-prod-code1534000008.jpg',8,1,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (9,1534000009,'Manzana Roja Por Kg','Manzana Roja Por Kg',89.00,12,500,'img-prod-code1534000009.jpg',7,2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (10,1534000010,'Papa Fraccionada Por Kg','Papa Fraccionada Por Kg',32.00,0,400,'img-prod-code1534000010.jpg',7,2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (11,1534000011,'Repollo Blanco Por Kg','Repollo Blanco Por Kg',32.00,0,230,'img-prod-code1534000011.jpg',7,2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (12,1534000012,'Banana X Kg','Banana X Kg',99.00,0,300,'img-prod-code1534000012.jpg',7,2,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (13,1534000013,'Aceite De Oliva Lira 1L','Aceite De Oliva Lira Clásico Extra Virgen presentacion en lata 1L',690.00,0,450,'img-prod-code1534000013.jpg',6,4,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (14,1534000014,'Maní Pelado Pehuamar 90 Gr','Maní Pelado Pehuamar 90 Gr clasicas',69.00,0,300,'img-prod-code1534000014.jpg',6,4,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (15,1534000015,'Fideos Tallarines Knorr 500 Gr','Fideos Tallarines Knorr paquete de 500 Gr ,semola',59.00,0,530,'img-prod-code1534000015.jpg',6,4,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (16,1534000016,'Arroz Lucchetti Largo Fino 1 Kg','Arroz Lucchetti Largo Fino 1 Kg',61.00,0,256,'img-prod-code1534000016.jpg',6,4,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (17,1534000017,'Jabón Liquido Skip 3L','Jabón Liquido Para Ropa Skip Doypack 3 Litros',445.00,30,500,'img-prod-code1534000017.jpg',6,5,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (18,1534000018,'Limpiador De Pisos Poett','Limpiador De Pisos Poett Lavanda 1800 Ml',118.00,10,400,'img-prod-code1534000018.jpg',6,5,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (19,1534000019,'Limpiador Harpic 500 Ml',' Limpiador Harpic Gel Extra Fuerte 500 Ml',197.00,12,600,'img-prod-code1534000019.jpg',6,5,'2020-07-13 13:55:39','2020-07-13 13:55:39'),
    (20,1534000020,'Limpiador Líquido Cif 450 Ml','Limpiador Líquido Cif Vidrios Repuesto 450 Ml',58.00,25,350,'img-prod-code1534000020.jpg',6,5,'2020-07-13 13:55:39','2020-07-13 13:55:39');
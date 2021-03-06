-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2020 a las 03:38:53
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prosegma`
--
CREATE DATABASE IF NOT EXISTS `prosegma` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `prosegma`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camposproveedor`
--

CREATE TABLE `camposproveedor` (
  `idcamposproveedor` int(11) NOT NULL,
  `idproveedor` int(11) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `idtipocampo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo`
--

CREATE TABLE `catalogo` (
  `idcatalogo` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `idcamposproveedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase`
--

CREATE TABLE `clase` (
  `codigoclase` int(11) NOT NULL,
  `nombreClase` varchar(100) DEFAULT NULL,
  `idfamilia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificacion`
--

CREATE TABLE `clasificacion` (
  `idclasificacion` int(11) NOT NULL,
  `codigoSegmento` int(11) DEFAULT NULL,
  `codigoFamilia` int(11) DEFAULT NULL,
  `codigoClase` int(11) DEFAULT NULL,
  `codigoProducto` int(11) DEFAULT NULL,
  `idInscripcion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `iddatos` int(11) NOT NULL,
  `dato` varchar(100) DEFAULT NULL,
  `idcamposproveedor` int(11) DEFAULT NULL,
  `documento` blob DEFAULT NULL,
  `idinscripcion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familia`
--

CREATE TABLE `familia` (
  `codigoFamilia` int(11) NOT NULL,
  `nombreFamilia` varchar(100) DEFAULT NULL,
  `idSegmento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `idinscripcion` int(11) NOT NULL,
  `idproveedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `idperfil` int(11) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `nombre` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codigoproducto` int(11) NOT NULL,
  `nombreproducto` varchar(100) DEFAULT NULL,
  `idclase` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `idproveedor` int(11) NOT NULL,
  `razon_social` varchar(200) DEFAULT NULL,
  `cotizacion` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `segmento`
--

CREATE TABLE `segmento` (
  `codigoSegmento` int(11) NOT NULL,
  `nombreSegmento` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_documentos`
--

CREATE TABLE `solicitud_documentos` (
  `iddocumentos` int(11) NOT NULL,
  `nombredocumento` varchar(100) DEFAULT NULL,
  `codigoSegmento` int(11) DEFAULT NULL,
  `codigoFamilia` int(11) DEFAULT NULL,
  `codigoClase` int(11) DEFAULT NULL,
  `codigoProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocampo`
--

CREATE TABLE `tipocampo` (
  `idtipocampo` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `clave` varchar(200) DEFAULT NULL,
  `idperfil` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `correo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `camposproveedor`
--
ALTER TABLE `camposproveedor`
  ADD PRIMARY KEY (`idcamposproveedor`),
  ADD KEY `id_campos_proveedor` (`idproveedor`),
  ADD KEY `id_tipo_campo` (`idtipocampo`);

--
-- Indices de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD PRIMARY KEY (`idcatalogo`),
  ADD KEY `id_campo_catalogo` (`idcamposproveedor`);

--
-- Indices de la tabla `clase`
--
ALTER TABLE `clase`
  ADD PRIMARY KEY (`codigoclase`),
  ADD KEY `id_clase_familia` (`idfamilia`);

--
-- Indices de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD PRIMARY KEY (`idclasificacion`),
  ADD KEY `id_clasificacion_segmento` (`codigoSegmento`),
  ADD KEY `id_clasificacion_familia` (`codigoFamilia`),
  ADD KEY `id_clasificacion_clase` (`codigoClase`),
  ADD KEY `id_clasificacion_producto` (`codigoProducto`),
  ADD KEY `id_clasificacion_inscripcion` (`idInscripcion`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`iddatos`),
  ADD KEY `id_campos_datos` (`idcamposproveedor`),
  ADD KEY `id_datos_inscripcion` (`idinscripcion`);

--
-- Indices de la tabla `familia`
--
ALTER TABLE `familia`
  ADD PRIMARY KEY (`codigoFamilia`),
  ADD KEY `id_familia_segmento` (`idSegmento`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`idinscripcion`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`idperfil`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codigoproducto`),
  ADD KEY `id_producto_clase` (`idclase`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idproveedor`);

--
-- Indices de la tabla `segmento`
--
ALTER TABLE `segmento`
  ADD PRIMARY KEY (`codigoSegmento`);

--
-- Indices de la tabla `solicitud_documentos`
--
ALTER TABLE `solicitud_documentos`
  ADD PRIMARY KEY (`iddocumentos`),
  ADD KEY `id_solicitud_segmento` (`codigoSegmento`),
  ADD KEY `id_solicitud_familia` (`codigoFamilia`);

--
-- Indices de la tabla `tipocampo`
--
ALTER TABLE `tipocampo`
  ADD PRIMARY KEY (`idtipocampo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD KEY `usuario_perfil` (`idperfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  MODIFY `idcatalogo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `idclasificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `iddatos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `idinscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud_documentos`
--
ALTER TABLE `solicitud_documentos`
  MODIFY `iddocumentos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `camposproveedor`
--
ALTER TABLE `camposproveedor`
  ADD CONSTRAINT `id_campos_proveedor` FOREIGN KEY (`idproveedor`) REFERENCES `proveedor` (`idproveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_tipo_campo` FOREIGN KEY (`idtipocampo`) REFERENCES `tipocampo` (`idtipocampo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD CONSTRAINT `id_campo_catalogo` FOREIGN KEY (`idcamposproveedor`) REFERENCES `camposproveedor` (`idcamposproveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `clase`
--
ALTER TABLE `clase`
  ADD CONSTRAINT `id_clase_familia` FOREIGN KEY (`idfamilia`) REFERENCES `familia` (`codigoFamilia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD CONSTRAINT `id_clasificacion_clase` FOREIGN KEY (`codigoClase`) REFERENCES `clase` (`codigoclase`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_clasificacion_familia` FOREIGN KEY (`codigoFamilia`) REFERENCES `familia` (`codigoFamilia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_clasificacion_inscripcion` FOREIGN KEY (`idInscripcion`) REFERENCES `inscripcion` (`idinscripcion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_clasificacion_producto` FOREIGN KEY (`codigoProducto`) REFERENCES `producto` (`codigoproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_clasificacion_segmento` FOREIGN KEY (`codigoSegmento`) REFERENCES `segmento` (`codigoSegmento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `datos`
--
ALTER TABLE `datos`
  ADD CONSTRAINT `id_campos_datos` FOREIGN KEY (`idcamposproveedor`) REFERENCES `camposproveedor` (`idcamposproveedor`),
  ADD CONSTRAINT `id_datos_inscripcion` FOREIGN KEY (`idinscripcion`) REFERENCES `inscripcion` (`idinscripcion`);

--
-- Filtros para la tabla `familia`
--
ALTER TABLE `familia`
  ADD CONSTRAINT `id_familia_segmento` FOREIGN KEY (`idSegmento`) REFERENCES `segmento` (`codigoSegmento`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `id_producto_clase` FOREIGN KEY (`idclase`) REFERENCES `clase` (`codigoclase`);

--
-- Filtros para la tabla `solicitud_documentos`
--
ALTER TABLE `solicitud_documentos`
  ADD CONSTRAINT `id_solicitud_familia` FOREIGN KEY (`codigoFamilia`) REFERENCES `familia` (`codigoFamilia`),
  ADD CONSTRAINT `id_solicitud_segmento` FOREIGN KEY (`codigoSegmento`) REFERENCES `segmento` (`codigoSegmento`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuario_perfil` FOREIGN KEY (`idperfil`) REFERENCES `perfil` (`idperfil`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

--Creacion de tablas para evaluaciones

CREATE TABLE `prosegma`.`evaluacion_proveedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(200) NULL,
  `descripcion` VARCHAR(500) NULL,
  `fecha_creacion` DATETIME NULL,
  `calificacion_total` DOUBLE NULL,
  `id_proveedor` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_proveedor_idx` (`id_proveedor` ASC) VISIBLE,
  CONSTRAINT `id_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `prosegma`.`proveedor` (`idproveedor`));

CREATE TABLE `prosegma`.`criterios_evaluacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `criterio` VARCHAR(200) NULL,
  `descripcion` VARCHAR(500) NULL,
  `peso` DOUBLE NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `prosegma`.`datos_evaluacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_evaluacion` INT NOT NULL,
  `id_criterio` INT NOT NULL,
  `calificacion_criterio` DOUBLE NULL,
  PRIMARY KEY (`id`),
  INDEX `id_criterio_idx` (`id_criterio` ASC) VISIBLE,
  INDEX `id_evaluacion_idx` (`id_evaluacion` ASC) VISIBLE,
  CONSTRAINT `id_criterio`
    FOREIGN KEY (`id_criterio`)
    REFERENCES `prosegma`.`criterios_evaluacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_evaluacion`
    FOREIGN KEY (`id_evaluacion`)
    REFERENCES `prosegma`.`evaluacion_proveedor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `prosegma`.`evaluacion_proveedor` 
CHANGE COLUMN `fecha_creacion` `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ;


CREATE TABLE `prosegma`.`transacciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_limite_entrega` DATETIME NULL,
  `id_orden_compra` INT NULL,
  `ruta_orden_compra` VARCHAR(100) NULL,
  `estado` VARCHAR(100) NULL,
  `observacion` VARCHAR(500) NULL,
  `id_proveedor` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_proveedor_idx` (`id_proveedor` ASC) VISIBLE,
  CONSTRAINT `id_provider`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `prosegma`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `prosegma`.`datos_transaccion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_transaccion` INT NULL,
  `id_producto` INT NULL,
  `cantidad_esperada` DOUBLE NULL,
  `cantidad_recibida` DOUBLE NULL,
  `unidades` VARCHAR(50) NULL,
  `aprobacion_calidad` VARCHAR(100) NULL,
  `observacion` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  INDEX `id_transaccion_idx` (`id_transaccion` ASC) VISIBLE,
  INDEX `id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `id_transaccion`
    FOREIGN KEY (`id_transaccion`)
    REFERENCES `prosegma`.`transacciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `prosegma`.`producto` (`codigoproducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    ALTER TABLE `prosegma`.`clase` 
    ADD COLUMN `idsegmento` INT NULL AFTER `idfamilia`,
    ADD INDEX `id_segmento_idx` (`idsegmento` ASC) VISIBLE;
    ;
    ALTER TABLE `prosegma`.`clase` 
    ADD CONSTRAINT `id_segmento`
    FOREIGN KEY (`idsegmento`)
    REFERENCES `prosegma`.`segmento` (`codigoSegmento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

    ALTER TABLE `prosegma`.`producto` 
ADD COLUMN `id_familia` INT NULL AFTER `idclase`,
ADD COLUMN `id_segmento` INT NULL AFTER `id_familia`,
ADD INDEX `id_segmento_idxs` (`id_segmento` ASC) VISIBLE,
ADD INDEX `id_familia_idxs` (`id_familia` ASC) VISIBLE;
;
ALTER TABLE `prosegma`.`producto` 
ADD CONSTRAINT `id_familia`
  FOREIGN KEY (`id_familia`)
  REFERENCES `prosegma`.`familia` (`codigoFamilia`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `id_segmento_pro`
  FOREIGN KEY (`id_segmento`)
  REFERENCES `prosegma`.`segmento` (`codigoSegmento`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `prosegma`.`producto` 
DROP COLUMN `idsegmento`,
DROP COLUMN `idfamilia`,
DROP INDEX `id_familia_idx` ,
DROP INDEX `id_segmento_idx` ;
ALTER TABLE `prosegma`.`producto` ALTER INDEX `id_segmento_idxs` INVISIBLE;
ALTER TABLE `prosegma`.`producto` ALTER INDEX `id_familia_idxs` INVISIBLE;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

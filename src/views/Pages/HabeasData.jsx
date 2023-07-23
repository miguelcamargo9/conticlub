import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";

class HabeasData extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <div>
                <p>
                  Continental Tire Colombia SAS identificada con NIT.
                  &nbsp;900.557.347-6 &nbsp;y domicilio principal en Bogotá D.C
                  &nbsp;permite informar:
                </p>

                <p>
                  Que en cumplimiento de la Ley Estatutaria 1581 de 2012 por la
                  cual se establece el Régimen General de Protección de Datos y
                  el Decreto reglamentario 1377 de 2013, es responsable del
                  tratamiento (recolección, almacenamiento, uso, circulación o
                  supresión) de los datos y archivos en desarrollo de su objeto
                  social.
                </p>

                <p>
                  Los titulares de los datos personales tienen el derecho a
                  conocer, actualizar, rectificar o suprimir frente a los
                  responsables del tratamiento, la información recolectada en
                  las bases de datos o archivos, en los términos establecidos en
                  la norma vigente y en la Políticas de Tratamiento de la
                  información.
                </p>

                <p>
                  Agradecemos nos contacte si requiere aclarar, actualizar,
                  corregir o suprimir alguno de sus datos personales, siempre
                  que sea procedente en los términos del decreto 1377 de 2013.
                  Para efectos de lo anterior, los canales de comunicación
                  establecidos para lo relacionado con el tratamiento de datos
                  personales son: la línea en Bogotá 3013211294, correo
                  electrónico contacto@conticlub.co
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(gridSystemStyle)(HabeasData);

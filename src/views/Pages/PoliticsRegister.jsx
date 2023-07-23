import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";

class PoliticsRegister extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <div>
                <p>
                  <strong>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vigencia:</strong>
                </p>
                <p>
                  El programa dará inicio a partir que se realice la
                  comunicación formal del programa por parte de CONTINENTAL al
                  distribuidor y estará vigente hasta que la compañía lo
                  consideré y lo comunique formalmente.
                </p>
                <p>
                  <strong>
                    2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Participantes:
                  </strong>
                </p>
                <p>
                  En el programa sólo podrán participar la fuerza de ventas de
                  los distribuidores (desde ahora “PARTICIPANTES”), estos serán
                  previamente autorizados y validados por CONTINENTAL.
                </p>
                <p>
                  <strong>
                    3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Envío de información:
                  </strong>
                </p>
                <p>
                  Dentro del desarrollo del programa CONTINENTAL podrá enviar
                  informaciones concernientes a nuestras marcas, políticas o
                  temas relacionados al programa a cualquiera de los datos de
                  contacto ingresado por los participantes pues hacen parte del
                  mismo.
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(gridSystemStyle)(PoliticsRegister);

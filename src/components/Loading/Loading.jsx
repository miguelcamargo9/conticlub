import React from "react";
import { connect } from "react-redux";

class Loading extends React.Component {
  render() {
    if (this.props.networkError) {
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
          No se pudieron cargar los datos. Verifique su conexion con el servidor.
        </div>
      );
    }
    return <div>Cargando...</div>;
  }
}

function mapStateToProps({ error }) {
  return { networkError: error.networkError };
}

export default connect(mapStateToProps)(Loading);

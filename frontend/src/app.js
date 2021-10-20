import React from "react";
const apiUri = "http://localhost:8080/api/v1/colourpicker/";

class Colours extends React.Component {
  render() {
      return (
          <table>
              <thead>
                  <tr>
                      <th>Colour</th>
                      <th>Hex</th>
                      <th>RGB</th>
                  </tr>
              </thead>
              <tbody>
                  {this.props.colours && this.props.colours.map(colour => {
                      return <tr>
                          <td>{colour.colour}</td>
                          <td>{colour.hex}</td>
                          <td>{colour.rgb}</td>
                      </tr>
                  })}
              </tbody>
          </table>
      );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colours: [],
      colour: '',
      hex: '',
      rgb: '',
      _id: ''
    };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // read all entities
    fetch(apiUri, {
        "method": "GET",
    })
    .then(response => response.json())
    .then(response => {
        this.setState({
        colours: response
        })
    })
    .catch(err => { console.log(err); 
    });
  }

  create(e) {
    // creates entity
    fetch(apiUri, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        colour: this.state.colour,
        hex: this.state.hex,
        rgb: this.state.rgb
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
    e.preventDefault();
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

  }

  delete(e) {
    // deletes entities
    fetch(`http://localhost:8080/api/v1/colourpicker/${this.state.colours[this.state.colours.length - 1]._id}`, {
      "method": "DELETE",
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Add-Update-Delete Colour</h1>
              <form className="d-flex flex-column">
                <label htmlFor="colour">
                  Colour:
                  <input
                    name="colour"
                    id="colour"
                    type="text"
                    className="form-control"
                    value={this.state.colour}
                    onChange={(e) => this.handleChange({ colour: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="hex">
                  Colour Hex:
                  <input
                    name="hex"
                    id="hex"
                    type="text"
                    className="form-control"
                    value={this.state.hex}
                    onChange={(e) => this.handleChange({ hex: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="rgb">
                  Colour RGB:
                  <input
                    name="rgb"
                    id="rgb"
                    type="text"
                    className="form-control"
                    value={this.state.rgb}
                    onChange={(e) => this.handleChange({ rgb: e.target.value })}
                    />
                </label>
                <br/>
                <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                  Add
                </button>
                <br/>
                <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                    Update
                </button>
                <br/>
                <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                    Delete
                </button>
                <br/>
              </form>
              <Colours colours={this.state.colours} />
            </div>
          </div>
        </div>
    );
  }
}
export default App;
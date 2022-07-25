import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../Nav";
import { getGenres,getPlatforms, createVideogames } from "../../redux/actions";
import s from "./Form.module.css";

const validate = (obj) => {
  let errors = {};
  if (!obj.form.name) errors.name = "Name is required";
  else if (!/^[a-zA-Z\s]+$/.test(obj.form.name)) errors.name = "Name is invalid";
  else if (!obj.form.released) errors.released = "Date is required";
  else if (obj.form.rating === "0") errors.rating = "Rating is required";
  else if (!obj.form.image) errors.image = "Link address is required";
  else if (obj.form.genres.length === 0) errors.genres = "Genre is required";
  else if (obj.form.platforms.length === 0)
    errors.platforms = "Platform is required";
  else if (!obj.form.description) errors.description = "Description es required";
  return errors;
};

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        released: "",
        rating: "0",
        image: "",
        genres: [],
        platforms: [],
        description: "",
      },
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getGenres();
    this.props.getPlatforms();
  }

  handleInput = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
      errors: validate({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      }),
    });
  };
  handleSelectGenre = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        genres: [...this.state.form.genres, e.target.value],
      },
      errors: validate({
        form: {
          ...this.state.form,
          genres: [...this.state.form.genres, e.target.value],
        },
      }),
    });
  };
  handleSelectPlatform = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        platforms: [...this.state.form.platforms, e.target.value],
      },
      errors: validate({
        form: {
          ...this.state.form,
          platforms: [...this.state.form.platforms, e.target.value],
        },
      }),
    });
  };
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, released, rating,image, genres, platforms, description } =
      this.state.form;
    if (
      !name ||
      !released ||
      rating === "0" ||
      !image ||
      genres.length === 0 ||
      platforms.length === 0 ||
      !description ||
      Object.keys(this.state.errors).length !== 0
    ) {
      alert("Complete all the fields");
    } else {
      this.props.createVideogames(this.state.form);
      alert("Videogame created!!!");
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <div className={s.createGame}>
        <Nav />
        <form className={s.form} onSubmit={(e) => this.handleSubmit(e)}>
          <h2>VideoGame Creation Form</h2>
          <label>
            Name :
            <input
              type="text"
              name="name"
              value={this.state.form.name}
              onChange={(e) => this.handleInput(e)}
            />
          </label>
          {this.state.errors.name && (
            <p className={s.danger}>{this.state.errors.name}</p>
          )}
          <label>
            Released :
            <input
              type="date"
              name="released"
              value={this.state.form.released}
              onChange={(e) => this.handleInput(e)}
            />
          </label>
          {this.state.errors.released && (
            <p className={s.danger}>{this.state.errors.released}</p>
          )}
          <label>
            Rating :
            <input
              type="range"
              min="0"
              max="5"
              name="rating"
              value={this.state.form.rating}
              onChange={(e) => this.handleInput(e)}
            />
          </label>
          {this.state.errors.rating && (
            <p className={s.danger}>{this.state.errors.rating}</p>
          )}
          <label>
            Image :
            <input
              type="url"
              name="image"
              value={this.state.form.image}
              onChange={(e) => this.handleInput(e)}
            />
          </label>
          {this.state.errors.image && (
            <p className={s.danger}>{this.state.errors.image}</p>
          )}
          <label>Genres:</label>
          <select onChange={(e) => this.handleSelectGenre(e)}>
            <option value="">***Select***</option>
            {this.props.genres &&
              this.props.genres?.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
          </select>
          {this.state.form.genres.length > 0
            ? this.state.form.genres.map((el, i) => (
              <p className={s.p} key={i}>{el}</p>
              ))
            : null}
          {this.state.errors.genres && (
            <p className={s.danger}>{this.state.errors.genres}</p>
          )}
          <label>Platforms:</label>
          <select
            name="platforms"
            onChange={(e) => this.handleSelectPlatform(e)}
          >
            <option value="">***Select***</option>
            {this.props.platforms &&
              this.props.platforms?.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
          </select>
          {this.state.form.platforms.length > 0
            ? this.state.form.platforms.map((el, i) => (
              <p className={s.p}  key={i}>{el}</p>
              ))
            : null}
          {this.state.errors.platforms && (
            <p className={s.danger}>{this.state.errors.platforms}</p>
          )}
          <label>Description :</label>
          <textarea
            name="description"
            value={this.state.form.description}
            onChange={(e) => this.handleInput(e)} 
          ></textarea>
          {this.state.errors.description && (
            <p className={s.danger}>{this.state.errors.description}</p>
          )}
          <div><button type="submit">Send Data</button></div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    genres: state.genres,
    platforms:state.platforms
  };
}

export default connect(mapStateToProps, { getGenres,getPlatforms, createVideogames })(Form);

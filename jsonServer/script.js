let courses;
const get_data = async (render) => {
  let res = await fetch("http://localhost:5500/courses");
  courses = await res.json();
  render(courses);
};

function render(courses) {
  let Parentdiv = document.querySelector(".courses");
  Parentdiv.innerHTML = "";
  for (let course of courses) {
    let div_course = document.createElement("div");
    div_course.setAttribute("class", "course");

    let img = document.createElement("img");
    img.setAttribute("src", course.img);
    div_course.appendChild(img);

    let P_course_name = document.createElement("p");
    P_course_name.setAttribute("class", "CourseName");
    P_course_name.textContent = course.heading;
    div_course.appendChild(P_course_name);

    let P_author = document.createElement("p");
    P_author.setAttribute("class", "Author");
    P_author.textContent = course.author;
    div_course.appendChild(P_author);

    let rating = document.createElement("div");
    let rate = document.createElement("span");
    rate.setAttribute("class", "rate");
    rate.textContent = course.rate;
    rating.appendChild(rate);
    for (let i = 0; i < course.rate; i++) {
      let fillStar = document.createElement("span");
      fillStar.setAttribute("class", "star");
      fillStar.innerHTML = "&#9733;";
      rating.appendChild(fillStar);
    }
    for (let i = course.rate; i < 5; i++) {
      let emptyStar = document.createElement("span");
      emptyStar.setAttribute("class", "star");
      emptyStar.innerHTML = "&#9734;";
      rating.appendChild(emptyStar);
    }
    div_course.appendChild(rating);

    let P_price = document.createElement("p");
    P_price.setAttribute("class", "Price");
    P_price.textContent = course.price;
    div_course.appendChild(P_price);
    Parentdiv.appendChild(div_course);
  }
}

get_data(render);

function search() {
  let searchText = document.querySelector(".search-bar").value;
  let matched = [];
  console.log(courses);
  for (let course of courses) {
    if (course.heading.includes(searchText)) {
      matched.push(course);
    }
  }
  render(matched);
}

let search_button = document.querySelector(".search-button");
search_button.addEventListener("click", search);

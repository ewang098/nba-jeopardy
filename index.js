/**
 * Eric Wang
 *This code was created as part of assignment for CSE 154: Webprogramming
 *This javascript file allows for the user to interact with the jeopardy cards.
 *Use of (this) allows for each card to have its own trajectory.
 *Event listeners used to progress cost-card -> question -> answer -> answered (complete)
 *Citation: wrong, right button images acquired via Nucleo
 */
"use strict";

(function() {
  window.addEventListener("load", init);

  /** Init function that finds all costCards and adds event listeners to move to question stage*/
  function init() {
    let costs = qsa(".cost-card");

    for (let i = 0; i < costs.length; i++) {
      costs[i].addEventListener("click", flipQuestion);
    }
  }

  /**
   * Flips the card to the question card, sets card to question,
   * finds corresponding question and replaces text with question.
   * Adds event listener to question to move to answer stage
   */
  function flipQuestion() {
    this.removeEventListener("click", flipQuestion);
    this.classList.remove("cost-card");
    let categories = ["draftpicks", "hof", "playoffs", "mvp", "underdogs"];
    let cost = this.textContent.trim();
    cost = cost.substring(1);

    let costNum = parseInt(cost);

    let catName = this.className.trim();
    const BASE = 200;

    let index = (parseInt(cost) / BASE) - 1;
    let catIndex = categories.indexOf(catName);

    let questions = getQuestions();

    this.textContent = questions[catIndex][index];
    this.classList.add("question");

    this.addEventListener("click", function() {
      flipAnswer(this, catIndex, index, costNum);
    }, false);
  }

  /**
   * Flips card to answer card, sets card to answer,
   * finds corresponding answer and replaces text with answer.
   * Adds event listener to answer to move to scoring stage.
   * @param {element} card - the element we want to progress
   * @param {int} catIndex - the category index to locate the corresponding answer
   * @param {int} index - the sub-index to locate the corresponding answer
   * @param {int} costNum - the cost associated with answering the question correctly
   */
  function flipAnswer(card, catIndex, index, costNum) {
    card.removeEventListener("click", flipAnswer);
    card.classList.remove("question");
    let answers = getAnswers();

    card.classList.add("answer");
    card.textContent = answers[catIndex][index];
    let right = gen("img");
    right.classList.add("right-button");
    right.src = "img/right.png";
    let wrong = gen("img");
    wrong.src = "img/wrong.png";
    wrong.classList.add("wrong-button");

    card.appendChild(right);
    card.appendChild(wrong);
    right.addEventListener("click", function() {
      rightAnswer(card, costNum);
    }, false);
    wrong.addEventListener("click", function() {
      wrongAnswer(card);
    }, false);
  }

  /**
   * If user selects right answer, the card is removed via adding class.
   * Score is increased.
   * @param {element} card - the element we want to progress
   * @param {int} costNum - the cost associated with answering the question correctly
   */
  function rightAnswer(card, costNum) {
    let parent = card;
    parent.classList.add("answered");

    let score = id("score");
    score.textContent = parseInt(score.textContent) + costNum;
  }

  /**
   * If user selects wrong answer, the card is removed via adding class.
   * Score is unchanged.
   * @param {element} card - the element we want to progress
   */
  function wrongAnswer(card) {
    let parent = card;
    parent.classList.add("answered");
  }

  /**
   * Questions array too large to fit into flipQuestion function (max 30 lines)
   * @returns {array} - array of questions (not complete), calls second function
   * to complete
   */
  function getQuestions() {
    let questions = [
      ["This player was the 3rd pick in the 1984 draft and went on to win 6 championships.",
      "This player was the 1st pick in the 1997 draft and won championships in the 1990s, 2000s," +
      " and 2010s.",
      "This player was the 57th pick in the 1999 draft and went on to win 4 championships.",
      "In the 2003 draft, this player was the only player to not be selected as an all-star" +
      " out of the first five picks.",
      "This player was the 30th pick in the 2011 draft and is now a 5x all star."],
      ["This player was a 1x MVP, 11x all-star, and was known as the 'Round Mound'.",
      "This player won 11 championships, all with the same team!",
      "This player once scored 81 points in a game.",
      "This player once scored 13 points in 33 seconds.",
      "This player has the most games, rebounds, assists, steals, and blocks for the" +
      " franchise that drafted him."],
      ["This player scored 38 points in a playoff game after getting sick from food poisoning.",
      "This player was 22 when he took his team to the NBA finals.",
      "This player is a 7x champion and is well known for his clutch shooting.",
      "This player holds the single game playoff record most points scored with 63 points.",
      "This is the only player to have received the Finals MVP being on the losing team."],
      ["This player is the only player to have won unanimous MVP.",
      "In the 1999-2000 season, this player was one vote short of unanimous MVP.",
      "This player has won the most MVPs (6) in the NBA.",
      "This player was MVP, DPOY, and a NBA champion in the same year.",
      "This point guard started at center when his team's center got hurt."]
    ];
    let ud = getQuestions2();
    questions.push(ud);
    return questions;
  }

  /**
   * Questions array too large to fit into getQuestions function (max 30 lines)
   * @returns {array} - array that has last part of questions
   */
  function getQuestions2() {
    let underdogs = ["This team came back from 3-1 in the NBA finals.",
    "In 2020, this team beat the 1st seed (east) in playoffs, who's star had won MVP & DPOY.",
    "This west team was not favored to win as their opposing team consisted of the big 3",
    "This team upset the 3-peat champions.",
    "This player started his collegiate career in D3 and ended up playing in the NBA Finals."];
    return underdogs;
  }

  /**
   * Answers array too large to fit into flipAnswer function (max 30 lines)
   * @returns {array} - array of answers to questions
   */
  function getAnswers() {
    let answers = [
      ["Who is Michael Jordan?", "Who is Tim Duncan?",
      "Who is Manu Ginobili?", "Who is Darko Milicic?",
      "Who is Jimmy Butler?"],
      ["Who is Charles Barkley?", "Who is Bill Russell?",
      "Who is Kobe Bryant?", "Who is Tracy McGrady?",
      "Who is Kevin Garnett?"],
      ["Who is Michael Jordan?", "Who is Lebron James?",
      "Who is Robert Horry?", "Who is Michael Jordan?",
      "Who is Jerry West?"],
      ["Who is Steph Curry?", "Who is Shaquille O'Neal?",
      "Who is Kareem Abdul-Jabbar?", "Who is Hakeem Olajuwon?",
      "Who is Magic Johnson?"],
      ["Who are the Cleveland Cavaliers?", "Who are the Miami Heat?",
      "Who are the Dallas Mavericks?", "Who are the Detroit Pistons?",
      "Who is Duncan Robinson?"]
    ];
    return answers;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Creates element with received tagName
   * @param {string} tagName - desired tag.
   * @returns {element} - returns element created.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();

/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */
var expext = require("expect");
var superTest = require("supertest");

const {app} = require('./../server');
const {todo} = require('./../models/todo');

beforeEach((done) => {
    todo.remove({}).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it("should create new todo", (done) => {
        var text = "test todo text";
        request(app)
            .post('./todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            }).end((err, res) => {
            if (err) {
                return done(err);
            }
            todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            })
        })
    });
});

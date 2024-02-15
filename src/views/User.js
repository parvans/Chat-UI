ls><details class="toggle implementors-toggle"><summary><section id="impl-Iterator-for-Cloned%3CI%3E" class="impl"><span class="rightside"><span class="since" title="Stable since Rust version 1.1.0">1.1.0</span> · <a class="src" href="../../src/core/iter\adapters/cloned.rs.html#32">source</a></span><a href="#impl-Iterator-for-Cloned%3CI%3E" class="anchor">§</a><h3 class="code-header">impl&lt;'a, I, T&gt; <a class="trait" href="trait.Iterator.html" title="trait std::iter::Iterator">Iterator</a> for <a class="struct" href="struct.Cloned.html" title="struct std::iter::Cloned">Cloned</a>&lt;I&gt;<span class="where fmt-newline">where
    T: 'a + <a class="trait" href="../clone/trait.Clone.html" title="trait std::clone::Clone">Clone</a>,
    I: <a class="trait" href="trait.Iterator.html" title="trait std::iter::Iterator">Iterator</a>&lt;Item = <a class="primitive" href="../primitive.reference.html">&amp;'a T</a>&gt;,</span></h3></section></summary><div class="impl-items"><section id="associatedtype.Item-42" class="associatedtype trait-impl"><a href="#associatedtype.Item-42" class="anchor">§</a><h4 class="code-header">type <a href="#associatedtype.Item" class="associatedtype">Item</a> = T</h4></section></div></details><details class="toggle implementors-toggle"><summary><section id="impl-Iterator-for-Copied%3CI%3E" class="impl"><span class="rightside"><span class="since" title="Stable since Rust version 1.36.0">1.36.0</span> · <a class="src" href="../../src/core/iter\adapters/copied.rs.html#40">source</a></span><a href="#impl-Iterator-for-Copied%3CI%3E" class="anchor">§</a><h3 class="code-header">impl&lt;'a, I, T&gt; <a class="trait" href="trait.Iterator.html" title="trait std::iter::Iterator">Iterator</a> for <a class="struct" href="struct.Copied.html" title="struct std::iter::Copied">Copied</a>&lt;I&gt;<span class="where fmt-newline">where
    T: 'a + <a class="trait" href="../marker/trait.Copy.html" title="trait std::marker::Copy">Copy</a>,
    I: <a class="trait" href="trait.Iterator.html" title="trait std::iter::Iterator">Iterator</a>&lt;Item = <a class="primitive" href="../primitive.reference.html">&amp;'a T</a>&gt;,</span></h3></section></summary><div class="impl-items"><section id="associatedtype.Item-43" class="associatedtype trait-impl"><a href="#associatedtype.Item-43" class="anchor">§</a><h4 class="code-header">type <a href="#associatedtype.Item" class="associatedtype">Item</a> = T</h4></section></div></details><details class="toggle implementors-toggle"><summary><section id="impl-Iterator-for-Drain%3C'a,+K%3E" class="impl"><a class="src rightside" href="../../src/std/collections\hash/set.rs.html#1552-1563">source</a><a href="#impl-Iterator-for-Drain%3C'a,+K%3E" class="anchor">§</a><h3 class="code-header">impl&lt;'a, K&gt; <a class="trait" href="trait.Iterator.html" title="trait std::iter::Iterator">Iterator</a> for std::collections::hash_set::<a class="struct" href="../collections/hash_set/struct.Drain.html" title="struct std::collections::hash_set::Drain">Drain</a>&lt;'a, K&gt;</h3></section></summary><div class="impl-items"><section id="associatedtype.Item-44" class="associatedtype trait-impl"><a href="#associatedtype.Item-44" class="anchor">§</a><h4 class="code-header">type <a href="#associatedtype.Item" class="associatedtype">Item</a> = K</h4></section></div></details><details class="toggle implementors-toggle"><summary><section id="impl-Iterator-for-Iter%3C'a,+K%3E" class="impl"><a class="src rightside" href="../../src/std/collections\hash/set.rs.html#1492-1503">source</a><a href="#impl-Iterator-for-Iter%3C'a,+K%3E" class="anchor">§</a><h3 class="code-header">impl&lt;'a, K&gt; <a class="trait" href="trait.Iterator.html" title="trait std::iter::Iterator">Iterator</a> for std::collections::hash_set::<a class="struct" href="../collections/hash_set/struct.Iter.html" title="struct std::collections::hash_set::Iter">Iter</a>&lt;'a, K&gt;</h3></section></summary><div class="impl-items"><section id="associatedtype.Item-45" class="associatedtype trait-impl"><a href="#associatedtype.Item-45" class="anchor">§</asName="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/faces/joe-gardner-2.jpg")}
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        Creative Tim <br />
                        <span className="text-success">
                          <small>Available</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                          />
                        </div>
                      </Col>
                      <Col className="col-ms-7" xs="7">
                        Flume <br />
                        <span className="text-danger">
                          <small>Busy</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </CardBody>
            </Card> */}
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Chet"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Faker"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          type="textarea"
                          defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;

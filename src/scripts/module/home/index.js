define(["backbone", "react", "react-bootstrap"], function (Backbone, React, ReactUI) {
    "use strict";

    var Button = ReactUI.Button,
        Alert = ReactUI.Alert,
        Input = ReactUI.Input,
        MenuItem = ReactUI.MenuItem,
        Glyphicon = ReactUI.Glyphicon,
        DropdownButton = ReactUI.DropdownButton,
        ButtonToolbar = ReactUI.ButtonToolbar,
        OverlayTrigger = ReactUI.OverlayTrigger,
        Tooltip = ReactUI.Tooltip,
        TabbedArea = ReactUI.TabbedArea,
        TabPane = ReactUI.TabPane,
        Modal = ReactUI.Modal,
        ModalTrigger = ReactUI.ModalTrigger,
        ProgressBar = ReactUI.ProgressBar;

    var MyModal = React.createClass({
        render: function() {
            return (
                <Modal {...this.props} title="Modal heading" animation={false}>
                  <div className="modal-body">
                    <h4>Text in a modal</h4>
                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                    <h4>Popover in a modal</h4>
                    <p>TODO</p>

                    <h4>Tooltips in a modal</h4>
                    <p>TODO</p>

                    <hr />

                    <h4>Overflowing text to show scroll behavior</h4>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                  </div>
                  <div className="modal-footer">
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                  </div>
                </Modal>
            );
        }
    });


    App.Models.Home = Backbone.Model.extend({});

    App.Collections.Home = Backbone.Collection.extend({
        model: App.Models.Home
    });

    App.Views.Home = Backbone.View.extend({
        el: '#Main',
        initialize: function(c) {
            this.Collections = c;
            this.render();
        },
        render: function() {
            React.render(
                <div>
                    <a href="#group/index/j:1/k:2/c:abc/d:[xyz,abc]">group</a>
                    <Button bsStyle="primary">Default button</Button>
                    <Button>Default button</Button>
                    <Alert bsStyle="warning">
                      <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                    </Alert>
                    <form>
                        <Input type="text" addonBefore="@" />
                        <Input type="text" addonAfter=".00" />
                        <Input type="text" addonBefore="$" addonAfter=".00" />
                        <Input type="text" addonAfter={<Glyphicon glyph="music" />} />
                        <Input type="text" buttonBefore={<Button>Before</Button>} />
                        <Input type="text" buttonAfter={<DropdownButton title="Action">
                            <MenuItem key="1">Item</MenuItem>
                        </DropdownButton>} />
                    </form>

                    <ButtonToolbar>
                        <OverlayTrigger placement="left" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
                            <Button bsStyle="default">Holy guacamole!</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
                            <Button bsStyle="default">Holy guacamole!</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
                            <Button bsStyle="default">Holy guacamole!</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
                            <Button bsStyle="default">Holy guacamole!</Button>
                        </OverlayTrigger>
                    </ButtonToolbar>

                    <TabbedArea defaultActiveKey={2}>
                        <TabPane eventKey={1} tab="Tab 1">TabPane 1 content</TabPane>
                        <TabPane eventKey={2} tab="Tab 2">TabPane 2 content</TabPane>
                    </TabbedArea>

                    <ModalTrigger modal={<MyModal />}>
                        <Button bsStyle="primary" bsSize="large">Launch demo modal</Button>
                    </ModalTrigger>

                    <ProgressBar bsStyle="success" now={40} />
                    <ProgressBar bsStyle="info" now={20} />
                    <ProgressBar bsStyle="warning" now={60} />
                    <ProgressBar bsStyle="danger" now={80} />
                </div>,
                this.el
            );
        }
    })

    return function (params) {
        console.log(params);
        //模拟数据
        var hc = new App.Collections.Home();
        hc.add([
            {'name': 'home', 'link': '#home/index/a:moduleA/other:nothing'},
            {'name': 'group', 'link': '#group/index'}
        ]);
        new App.Views.Home(hc);
    }
});
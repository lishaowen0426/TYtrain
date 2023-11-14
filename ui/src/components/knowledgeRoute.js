import '../css/knowledgeRoute.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as go from 'gojs';
import Layout from './Layout';
import ProgressBar from './ProgressBar';
import React, { useRef, useEffect, useCallback } from 'react';
import { ReactDiagram } from 'gojs-react';

// @ts-nocheck{ useRef }
// 获取所有选项
const options = [
  // Options for the dropdown selector
  {value: 'option1', label: 'C#'},
  {value: 'option2', label: 'JAVA'},
];
const style = { 
  // Inline style object, consider moving to CSS file
  alignSelf: 'flex-s  start',
  zIndex: 1000,
  width: '120px'
};
const initDiagram = () => {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    'undoManager.isEnabled': false,
    initialContentAlignment: go.Spot.Left,
    allowSelect: false,
  });
  diagram.layout = $(go.TreeLayout);
  // Link template
  diagram.linkTemplate = $(
    go.Link,
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" })
  );
  // Define the function for button click action
  function buttonExpandCollapse(e, port) {
    var node = port.part;
    node.diagram.startTransaction("expand/collapse");
    var portid = port.portId;
    node.findLinksOutOf(portid).each(function (l) {
      if (l.visible) {
        // collapse whole subtree recursively
        collapseTree(node, portid);
      } else {
        // only expands immediate children and their links
        l.visible = true;
        var n = l.getOtherNode(node);
        if (n !== null) {
          n.location = node.getDocumentPoint(go.Spot.TopRight);
          n.visible = true;
        }
      }
    });
    diagram.toolManager.hideToolTip();
    node.diagram.commitTransaction("expand/collapse");
  }
  // recursive function for collapsing complete subtree
  function collapseTree(node, portid) {
    node.findLinksOutOf(portid).each(function (l) {
      l.visible = false;
      var n = l.getOtherNode(node);
      if (n !== null) {
        n.visible = false;
        collapseTree(n, null);  // null means all links, not just for a particular portId
      }
    });
  }
  // get the text for the tooltip from the data on the object being hovered over
  function tooltipTextConverter(data) {
    var str = "";
    var e = diagram.lastInput;
    var currobj = e.targetObject;
    if (currobj !== null && (currobj.name === "ButtonA" ||
      (currobj.panel !== null && currobj.panel.name === "ButtonA"))) {
      str = data.aToolTip;
    } else {
      str = data.bToolTip;
    }
    return str;
  }
  // define tooltips for buttons
  var tooltipTemplate =
    $("ToolTip",
      { "Border.fill": "whitesmoke", "Border.stroke": "lightgray" },
      $(go.TextBlock,
        {
          font: "8pt sans-serif",
          wrap: go.TextBlock.WrapFit,
          desiredSize: new go.Size(200, NaN),
          alignment: go.Spot.Center,
          margin: 6
        },
        new go.Binding("text", "", tooltipTextConverter))
    );
  diagram.nodeTemplateMap.add("decision",
    $(go.Node, "Auto",
      new go.Binding("text", "key"),
      // define the node's outer shape, which will surround the Horizontal Panel
      $(go.Shape, "RoundedRectangle",
        {
          fill: "#86b7fe", // 淡蓝色
          stroke: "hsl(211, 100%, 70%)", // 与填充色相同的边框色
          strokeWidth: 1,
          parameter1: 10 // Sets the corner rounding
        }),
      // define a horizontal Panel to place the node's text alongside the buttons
      $(go.Panel, "Vertical",
        $(go.TextBlock,
          {
            font: "30px Roboto, sans-serif",
            margin: 5,
          },
          new go.Binding("text", "key")),
        // define a vertical panel to place the node's two buttons one above the other
        $(go.Panel, "Vertical",
          { defaultStretch: go.GraphObject.Fill, margin: 4 },
          $("Button",  // button A
            {
              //  desiredSize: new go.Size(50, 70),
              name: "ButtonA",
              click: buttonExpandCollapse,
              toolTip: tooltipTemplate,
            },
            new go.Binding("portId", "a"),
            $(go.TextBlock,
              {
                // font: '500 16px Roboto, sans-serif' 
                font: "500 16px 'Roboto', sans-serif",
                stroke: "black", // 白色文本
                textAlign: "center", // 文字居中对齐
                wrap: go.TextBlock.WrapFit, // 文字换行适应宽度
                margin: 3 // 文字与边框的间距
              },
              new go.Binding("text", "aText"))
          ),  // end button A
          $("Button",  // button B
            {
              name: "ButtonB",
              click: buttonExpandCollapse,
              toolTip: tooltipTemplate
            },
            new go.Binding("portId", "b"),
            $(go.TextBlock,
              {
                font: "500 16px 'Roboto', sans-serif",
                stroke: "black", // 白色文本
                textAlign: "center", // 文字居中对齐
                wrap: go.TextBlock.WrapFit, // 文字换行适应宽度
                editable: true, // 如果你想要文本是可编辑的
                margin: 4 // 文字与边框的间距
              },
              new go.Binding("text", "bText"))
          )
        )  // end Vertical Panel
      )  // end Horizontal Panel
    ));  // end Node and call to add
  // define the Node template for leaf nodes
  diagram.nodeTemplateMap.add("personality",
    $(go.Node, "Auto",
      new go.Binding("text", "key"),
      $(go.Shape, "RoundedRectangle",
        {
          // fill: "whitesmoke", 
          // stroke: "lightgray" , 
          fill: $(go.Brush, "Linear", { 0: "white", 1: "#A4C8F0" }), // 从白色渐变到淡蓝色
          stroke: "#1E90FF", // 设置描边颜色为鲜蓝色
          strokeWidth: 3, // 描边宽度为3
          // 添加圆角
          // 添加阴影效果
          shadowVisible: true, // 启用阴影
        }),
      $(go.TextBlock,
        {
          font: '13px Roboto, sans-serif',
          wrap: go.TextBlock.WrapFit,
          desiredSize: new go.Size(200, NaN),
          margin: 5
        },
        new go.Binding("text", "text"))
    ));
  diagram.linkTemplate =
    $(go.Link, go.Link.Orthogonal,  // the whole link panel
      { fromPortId: "" },
      new go.Binding("fromPortId", "fromport"),
      $(go.Shape,  // the link shape
        { stroke: "lightblue", strokeWidth: 2 })
    )
  const model =
    $(go.GraphLinksModel,
      { linkFromPortIdProperty: "fromport" });
  makeNodes(model);
  makeLinks(model);
  diagram.model = model;
  // diagram.nodes.each(function (n) {
  //   console.log(n)
  //   if (n.ub.text !== "Start") n.visible = false;
  // });
  diagram.links.each(function (l) {
    l.visible = true;
  });
  //diagramRef.current = diagram;
  return diagram;
};
const KnowledgeRoute = () => {
  const diagramRef2 = useRef(null);
  useEffect(() => {
    const $ = go.GraphObject.make; // for conciseness in defining templates
    // 创建第二个Diagram
    const myDiagram2 = $(go.Diagram, diagramRef2.current, {
      // Initialize Diagram properties here
      // ...
    });
    // ... 这里可以定义每个Diagram的nodes和links等 ...
    // 清理函数
    return () => {
      myDiagram2.div = null;
    };
  }, []);
  //const diagramRef = useRef(null);
  // 下拉框更改处理器
  const handleSelectChange = (event) => {
//     // 逻辑来处理下拉框更改...
// // 访问 diagram 
// const diagram = diagramRef.current;
// // 修改 model 数据
// diagram.model.nodeDataArray = [];
// // 通知 GoJS 重新渲染
// diagram.model.setDataProperty(diagram.model.modelData);
  };
  // Initializes diagram
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column' }}> {/* 使用flexbox布局 */}
        {/* 下拉列表 */}
        <select
          className="form-select form-select-lg mb-3" // Bootstrap的类，mb-2提供下方的间隔
          onChange={handleSelectChange}
          style={style} 
          >
          {options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <ProgressBar/>
        {/* GoJS画布 */}
        <div id="" style={{ flexGrow: 1 }}> {/* flex-grow允许画布填满剩余空间 */}
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName="diagram-component"
            style={{ height: '500px' }} // 设置Diagram的高度
          />
        </div>
        <div ref={diagramRef2} divclassname="diagram-component" style={{  height: '200px', border: '1px solid black' }}></div>
      </div>
    </Layout>
  );
};
export default KnowledgeRoute;
function makeNodes(model) {
  var nodeDataArray = [
    // Category A - Basic Knowledge
    { key: "Start" ,text: "Start",aText : "入门" ,bText :"入门",a:"入门",b:"入门",category : "decision"},
    { key: "A", text: "基础知识" ,aText : "入门" ,bText :"入门"},
    { key: "A1", parent: "A", aText : "入门" ,bText :"入门" },
    { key: "A2", parent: "A", text: "基础知识" },
    { key: "A3", parent: "A", text: "类型转换" },
    { key: "A4", parent: "A", text: "变量定义" },
    { key: "A5", parent: "A", text: "常量" },
  
    // Category B - Object-Oriented Programming
    { key: "B", text: "面向对象编程" },
    { key: "B1", parent: "B", text: "面向对象" },
    { key: "B2", parent: "B", text: "枚举" },
    { key: "B3", parent: "B", text: "封装" },
    { key: "B4", parent: "B", text: "类" },
    { key: "B5", parent: "B", text: "结构体" },
    { key: "B6", parent: "B", text: "枚举" },
    { key: "B7", parent: "B", text: "特性 (Attribute)" },
  
    // Category C - Core Concepts
    { key: "C", text: "核心概念" },
    { key: "C1", parent: "C", text: "运算符" },
    { key: "C2", parent: "C", text: "判断" },
    { key: "C3", parent: "C", text: "循环" },
    { key: "C4", parent: "C", text: "方法" },
    { key: "C5", parent: "C", text: "字符串" },
    { key: "C6", parent: "C", text: "数组" },
    { key: "C7", parent: "C", text: "属性 (Property)" },
    { key: "C8", parent: "C", text: "索引器 (Indexer)" },
    { key: "C9", parent: "C", text: "委托 (Delegate)" },
    { key: "C10", parent: "C", text: "事件 (Event)" },
  
    // Category D - Advanced Concepts
    { key: "D", text: "高级概念" },
    { key: "D1", parent: "D", text: "构造函数" },
    { key: "D2", parent: "D", text: "析构函数" },
    { key: "D3", parent: "D", text: "继承" },
    { key: "D4", parent: "D", text: "接口" },
    { key: "D5", parent: "D", text: "委托 (Delegate)" },
    { key: "D6", parent: "D", text: "事件 (Event)" },
    { key: "D7", parent: "D", text: "集合 (Collection)" },
    { key: "D8", parent: "D", text: "泛型 (Generic)" },
  
    // Category E - Advanced Topics
    { key: "E", text: "高级主题" },
    { key: "E1", parent: "E", text: "临时方法" },
    { key: "E2", parent: "E", text: "不安全代码" },
    { key: "E3", parent: "E", text: "反射 (Reflection)" },
    { key: "E4", parent: "E", text: "命名空间" },
    { key: "E5", parent: "  ", text: "预处理器指令" },
    { key: "E6", parent: "E", text: "异常处理" },
    { key: "E7", parent: "E", text: "文件读写" },
    { key: "E8", parent: "E", text: "文件的输入与输出" }
  ];
  for (var i = 0; i < nodeDataArray.length; i++) {
    var d = nodeDataArray[i];
    if (d.key === "Start") {
      d.category = "decision";
    }else{
      d.category = "decision";
    }
  }
  // Assign the nodeDataArray to the model
  model.nodeDataArray = nodeDataArray;
}

function makeLinks(model) {
  var linkDataArray = model.nodeDataArray.filter(function (node) {
    return node.parent !== undefined;
  }).map(function (node) {
    return { from: node.parent, to: node.key };
  });
  // Assign the linkDataArray to the model
  model.linkDataArray = linkDataArray;
}
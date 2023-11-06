import React from 'react';
import Layout from './Layout';
import '../css/knowledgeRoute.css';
import { ReactDiagram } from 'gojs-react';
import * as go from 'gojs';

const knowledgeRoute = () => {

    const initDiagram = () => {
        const $ = go.GraphObject.make;
        const diagram = $(go.Diagram, {
            'undoManager.isEnabled': true,
            model: $(go.GraphLinksModel, {
                linkKeyProperty: 'key' // IMPORTANT! Specify a property name that contains unique keys for link data.
            })
        });

        diagram.nodeTemplate = $(
            go.Node, 'Auto',
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle', {
                stroke: null,
                fill: 'white'
            }),
            $(go.TextBlock, { margin: 8 }, new go.Binding('text'))
        );

        // Define the link template
        diagram.linkTemplate = $(
            go.Link,
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" })
        );

        return diagram;
    }

    const nodeDataArray = [
        { key: 1, text: 'C# 基础', loc: '0 0' },
        { key: 2, text: '面向对象', loc: '150 150' },
        { key: 3, text: '数据结构', loc: '300 0' },
        // 添加其他节点...
    ];

    const linkDataArray = [
        { key: 1, from: 1, to: 2 },
        { key: 2, from: 1, to: 3 },
        // 添加其他连接...
    ];

    return (
        <Layout>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName="diagram-component"
                nodeDataArray={nodeDataArray}
                linkDataArray={linkDataArray}
            />
        </Layout>
    );
};

export default knowledgeRoute;

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

import { GraphService } from './../services/graph.service';


@Component({
    selector: 'app-d3-graph',
    templateUrl: './d3-graph.component.html',
    styleUrls: ['./d3-graph.component.css']
})
export class D3GraphComponent implements OnInit {
    width: number = 1000;
    height: number = 1000;
    duration: number = 750;
    tree: any = d3.layout.tree()
        .size([800, 800]);

    diagonal: any = d3.svg.diagonal()
        .projection(d => { return [d.y, d.x]; });

    svg:any;
    root: any;
    counter: number = 0;
    locationId: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private graphService: GraphService
    ) {

        this.activatedRoute.params.subscribe(
        params => {
          this.locationId = params['locationId'];
        }
      );

    }


    update(source) {
        // Compute the new tree layout.
        var nodes = this.tree.nodes(this.root).reverse(),
            links = this.tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(d => { d.y = d.depth * 180; });

        // Update the nodes…
        var node = this.svg.selectAll("g.node")
            .data(nodes, d => { return d.id || (d.id = ++this.counter); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", this.click.bind(this));

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", d => { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("text")
            .attr("x", d => { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", d => { return d.children || d._children ? "end" : "start"; })
            .text(d => { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(this.duration)
            .attr("transform", d => { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", d => { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", d => { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = this.svg.selectAll("path.link")
            .data(links, d => { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                var o = { x: source.x0, y: source.y0 };
                return this.diagonal({ source: o, target: o });
            });

        // Transition links to their new position.
        link.transition()
            .duration(this.duration)
            .attr("d", this.diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this.duration)
            .attr("d", d => {
                var o = { x: source.x, y: source.y };
                return this.diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    click(d) {
        // d._children = d.children;
        // d.children = null;
   // Toggle children on click.
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        this.update(d);
    }

    ngOnInit() {
        this.svg = d3.select("app-d3-graph svg g");

        this.graphService.getData(this.locationId).subscribe(location => {
            this.root = location;
            this.root.x0 = this.height / 2;
            this.root.y0 = 0;

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            this.root.children.forEach(collapse);
            this.update(this.root);
        });


        d3.select(self.frameElement).style("height", "800px");


    }

}

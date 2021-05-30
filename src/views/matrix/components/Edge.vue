<template>
  <div>
    <div id="graph" class="text-center"></div>
  </div>
</template>

<style>
.node {
  font: 300 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
  fill: rgb(95, 95, 95);
}

.node:hover {
  fill: #000;
}

.node-link {
  stroke: steelblue;
  stroke-opacity: 0.4;
  fill: none;
  pointer-events: none;
}

.node:hover,
.node--source,
.node--target {
  font-weight: 700;
}

.node--source {
  fill: #2ca02c;
}

.node--target {
  fill: #d62728;
}

.node-link--source,
.node-link--target {
  stroke-opacity: 1;
  stroke-width: 2px;
}

.node-link--source {
  stroke: #d62728;
}

.node-link--target {
  stroke: #2ca02c;
}
</style>

<script>
import * as d3 from "d3";

export default {
  name: "Edge",
  props: ["tree", "diameter"],
  methods: {
    draw() {
      const diameter = this.diameter || 960;
      const radius = diameter / 2;
      const innerRadius = radius - 120;
      const cluster = d3.cluster().size([360, innerRadius]);
      const line = d3
        .radialLine()
        .curve(d3.curveBundle.beta(0.85))
        .radius(function (d) {
          return d.y;
        })
        .angle(function (d) {
          return (d.x / 180) * Math.PI;
        });

      const svg = d3
        .select("#graph")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

      var link = svg.append("g").selectAll(".node-link"),
        node = svg.append("g").selectAll(".node");

      var root = packageHierarchy(this.tree).sum(function (d) {
        return d.size;
      });

      cluster(root);

      link = link
        .data(packageImports(root.leaves()))
        .enter()
        .append("path")
        .each(function (d) {
          (d.source = d[0]), (d.target = d[d.length - 1]);
        })
        .attr("class", "node-link")
        .attr("d", line);

      node = node
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("class", "node")
        .attr("dy", "0.31em")
        .attr("transform", function (d) {
          return (
            "rotate(" +
            (d.x - 90) +
            ")translate(" +
            (d.y + 8) +
            ",0)" +
            (d.x < 180 ? "" : "rotate(180)")
          );
        })
        .attr("text-anchor", function (d) {
          return d.x < 180 ? "start" : "end";
        })
        .text(function (d) {
          return d.data.key;
        })
        .on("mouseover", mouseovered)
        .on("mouseout", mouseouted);

      function mouseovered(d) {
        node.each(function (n) {
          n.target = n.source = false;
        });

        link
          .classed("node-link--target", function (l) {
            if (l.target === d) return (l.source.source = true);
          })
          .classed("node-link--source", function (l) {
            if (l.source === d) return (l.target.target = true);
          })
          .filter(function (l) {
            return l.target === d || l.source === d;
          })
          .raise();

        node
          .classed("node--target", function (n) {
            return n.target;
          })
          .classed("node--source", function (n) {
            return n.source;
          });
      }

      function mouseouted() {
        link
          .classed("node-link--target", false)
          .classed("node-link--source", false);

        node.classed("node--target", false).classed("node--source", false);
      }

      // Lazily construct the package hierarchy from class names.
      function packageHierarchy(items) {
        var map = {};

        function find(name, data) {
          var node = map[name],
            i;
          if (!node) {
            node = map[name] = data || { name: name, children: [] };
            if (name.length) {
              node.parent = find(
                name.substring(0, (i = name.lastIndexOf(".")))
              );
              node.parent.children.push(node);
              node.key = name.substring(i + 1);
            }
          }
          return node;
        }

        items.forEach(function (d) {
          find(d.name, d);
        });
        return d3.hierarchy(map[""]);
      }

      // Return a list of imports for the given array of nodes.
      function packageImports(nodes) {
        var map = {},
          imports = [];

        // Compute a map from name to node.
        nodes.forEach(function (d) {
          map[d.data.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function (d) {
          if (d.data.imports)
            d.data.imports.forEach(function (i) {
              imports.push(map[d.data.name].path(map[i]));
            });
        });

        return imports;
      }
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    'diameter': function() {
     
    }
  }
};
</script>
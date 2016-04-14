var margin = {top: 0, right: 20, bottom: 10, left: 40};
var width = 1100 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var otherHeight = 200;
var bottomSvgTopMargin = 0;

var legendSvg = d3.select('.container').append('svg')
	.attr('class', 'legendSvg')
	.attr('width', width + margin.left + margin.right)
    .attr('height', 50 + margin.top + margin.bottom)
	.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    //transform: translate(40, 20);
	
var bottomSvg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', otherHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    //transform: translate(40, 20);


	
var inStateBoxLabel = legendSvg.append('rect')
		.attr('y', 10)
		.attr('height', 20)
		.attr('x', 10)
		.attr('width', 20)
		.attr('fill', '#cccccc');

var inStateLabel = legendSvg.append('text')
		.attr('class', 'legend')
		.attr("x", 40)
		.attr("y", 30)
		.text( 'In State Revenue')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
var outStateBoxLabel = legendSvg.append('rect')
		.attr('y', 40)
		.attr('height', 20)
		.attr('x', 10)
		.attr('width', 20)
		.attr('fill', '#66cef4');

var outStateLabel = legendSvg.append('text')
		.attr('class', 'legend')
		.attr("x", 40)
		.attr("y", 60)
		.text( 'Out of State Revenue')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	
	
	
var scaleX = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2);

var scaleY = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .orient('left')
    .ticks(15, '$');
	
	
console.log(addCommas(37000000));
	
function addCommas(a){
	var temp = a.toString().split('');
	if(temp.length <= 3){
		return temp.join('');
	}
	var i = temp.length - 1;
	var count = 1;
	for(i; i >= 0; i--, count++){
		if(count%3 == 0){
			temp.splice(i, 0, ',');
			i--;	
		}	
	}
	return temp.join('');
	 
}

d3.csv('cleanTuitionWithoutSome.csv', function(err, data) {
    if (err) throw error;
	//specific offsets for numbers
	var shapesOffset = 40;
	var inOutOffset = 130;
	var topNumOffset = 65;
	var bottomNumOffset = 125;
	var topTitleOffset = 60;
	var offsetForTopTitle = 40;
	
	var UNCTotalTuition = 367;
	
	
		
	

	var maxY = 0;
    data.forEach(function(d) {
        d.tOutOfState = Number(d.tOutOfState);
		d.tInState = Number(d.tInState);
		d.pOutOfState = Number(d.pOutOfState);
		d.pInState = Number(d.pInState);
		d.rOutOfState = Number(d.rOutOfState);
		d.rInState = Number(d.rInState);
		if(d.rInState + d.rOutOfState > maxY){
			maxY = d.rInState + d.rOutOfState;
		}
		//console.log(d.rOutOfState + "is a type of number "+ typeof d.rOutOfState);
    });
	
	var outOfStatePercent = 100;
	var inStatePercent = 0;
	
	var fullArc = d3.svg.arc()
		
		.outerRadius(radius)
		.innerRadius(radius - 20)
		.startAngle(0)
		.endAngle(Math.PI * 2);
	
	var fullCirlce = bottomSvg.append('circle')
		.attr('class', 'fullCircle')
		.attr("cx",  110 + inOutOffset)
        .attr("cy", bottomSvgTopMargin + 50 + shapesOffset+ topTitleOffset)
        .attr("r", 50)
        .attr('fill', '#cccccc');
		
	
	var radius = 50;
	var p = Math.PI * 2;
		
	var arc = d3.svg.arc()
		
		.outerRadius(radius)
		.innerRadius(radius - 20)
		.startAngle(0+(Math.PI/3))
		.endAngle(p+(Math.PI/3));
		
	var arcMarginTop = bottomSvgTopMargin + 50 + shapesOffset+ topTitleOffset;
	var arcLeftOffset = 110 + + inOutOffset;
	
	var leftPointForCircle = margin.left + 110;
	var percentCircle = bottomSvg
		.append("path")
		.attr('class', 'percentCircle')
		.datum({endAngle: .127 * Math.PI * 2})
		.attr('transform', 'translate('+arcLeftOffset+', '+ arcMarginTop +')')
      .attr("d", arc)
      .style("fill", "#66cef4");
	var innerCirlce = bottomSvg.append('circle')
		.attr('class', 'innerCircle')
		.attr("cx", 110 + inOutOffset)
        .attr("cy", bottomSvgTopMargin + 50 + shapesOffset+ topTitleOffset)
        .attr("r", 30)
        .attr('fill', 'white');
	
	var updateCircle = function(circ, p){
		circ.endAngle = p;
		
	}
	
	var schoolTitle = bottomSvg
		.append('text')
		.attr('class', 'schoolTitle percentText')
		.attr("x", 0)
		.attr("y", bottomSvgTopMargin + offsetForTopTitle)
		.text( 'NA')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	
	var inState = bottomSvg
		.append('text')
		.attr('class', 'inState percentText')
		.attr("x", 0)
		.attr("y", bottomSvgTopMargin + topNumOffset + topTitleOffset)
		.text( 'In State')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var outOfState = bottomSvg
		.append('text')
		.attr('class', 'outOfState percentText')
		.attr("x", 0)
		.attr("y", bottomSvgTopMargin + bottomNumOffset + topTitleOffset)
		.text( 'Out Of State')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	
	
	var inOutTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutTitle percentText')
		.attr("x", 0 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( 'Percent')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutTuitionTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutTuitionTitle percentText')
		.attr("x", 180 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( 'Tuition Rates')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");	
	var inOutRevTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutRevTitle percentText')
		.attr("x", 400 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( 'Revenue (Millions)')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");	
	var inOutPopTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutPopTitle percentText')
		.attr("x", 720 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( 'Student Population')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");	
		
	
	
	var outOfStatePercentNum = bottomSvg
		.append("text")
		.attr('class', 'outOfStatePercentNum percentText')
		.attr("x", 0 + inOutOffset)
		.attr("y", bottomSvgTopMargin+bottomNumOffset+ topTitleOffset)
		.text( '0%')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inStatePercentNum = bottomSvg
		.append("text")
		.attr('class', 'inStatePercentNum percentText')
		.attr("x", 0 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( '0%')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
		
	var tuitionRates = bottomSvg.append('g')
		.attr('class', 'rates');
		
	var outOfStateRate = tuitionRates.append('rect')
		.attr('class', 'outOfStateRate')
            .attr('x', 270 + inOutOffset)
            .attr('width', 110)
            .attr('y',  bottomSvgTopMargin + 70 + shapesOffset+ topTitleOffset)
            .attr('height', 20)
            .attr('fill', '#66cef4');
	var inStateRate = tuitionRates.append('rect')
		.attr('class', 'inStateRate')
            .attr('x', 270 + inOutOffset)
            .attr('width', 110)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 20)
            .attr('fill', '#cccccc');
	var outOfStateNum = tuitionRates
		.append('text')
		.attr('class', 'outOfStateNum percentText')
		.attr("x", 180 + inOutOffset)
		.attr("y", bottomSvgTopMargin + bottomNumOffset+ topTitleOffset)
		.text( '$00,000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inStateNum = tuitionRates
		.append('text')
		.attr('class', 'inStateNum percentText')
		.attr("x", 180 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( '$00,000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
		
	var tuitionRevenues = bottomSvg.append('g')
		.attr('class', 'revenues');
		
	var outOfStateRev = tuitionRevenues.append('rect')
		.attr('class', 'outOfStateRev')
            .attr('x', 470 + inOutOffset)
            .attr('width', 20)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 80)
            .attr('fill', '#66cef4');
	var inStateRev = tuitionRevenues.append('rect')
		.attr('class', 'inStateRev')
            .attr('x', 500 + inOutOffset)
            .attr('width', 20)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 80)
            .attr('fill', '#cccccc');
	var totalStateRev = tuitionRevenues.append('rect')
		.attr('class', 'totalStateRev')
            .attr('x', 530 + inOutOffset)
            .attr('width', 20)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 40)
            .attr('height', 0)
            .attr('fill', '#66cef4');
	var totalStateRevLine = tuitionRevenues.append('line')
		.attr('class', 'totalStateRevLine')
            .attr('x1', 530 + inOutOffset)
			.attr('x2', 530+inOutOffset + 20)
            .attr('y1',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 40)
			.attr('y2',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 40)	
            .attr('stroke-width', 1)
            .attr('stroke', '#cccccc');
	var totalStateRevNum = tuitionRates
		.append('text')
		.attr('class', 'totalStateRevNum percentText')
		.attr("x", 580 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( 'Total: $000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var diffRevNum = tuitionRates
		.append('text')
		.attr('class', 'diffRevNum percentText')
		.attr("x", 580 + inOutOffset)
		.attr("y", bottomSvgTopMargin + bottomNumOffset+ topTitleOffset)
		.text( 'Gain: $000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	
	
	var outOfStateRevNum = tuitionRates
		.append('text')
		.attr('class', 'outOfStateRevNum percentText')
		.attr("x", 400 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( '$000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inStateRevNum = tuitionRates
		.append('text')
		.attr('class', 'inStateRevNum percentText')
		.attr("x", 400 + inOutOffset)
		.attr("y", bottomSvgTopMargin + bottomNumOffset+ topTitleOffset)
		.text( '$000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
		
	var studentPop = bottomSvg.append('g')
		.attr('class', 'population');
	var studentPopNum = studentPop
		.append('text')
		.attr('class', 'studentPopNum percentText')
		.attr("x", 720 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 105+ topTitleOffset)
		.text( '00,000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#cccccc");
		

    console.log(data);

    scaleX.domain(data.map(function(d) { return d.university }));
    //scaleY.domain([0, d3.max(data, function(d) { return d.fgp; }) + 0.1]);
	//scaleY.domain([0, d3.max(data, function(d) { return d.rInState; })]);
	
	scaleY.domain([0, maxY]);
	scaleY.domain([0, maxY]);
	
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
		
	var barGroups = svg.selectAll('.bars')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'barGroups')
		.on('mouseover', function(d) {
			console.log("this is the d:  " + d);
			var inState = 0;
			var outOfState = 0;
			var inStateT = 0;
			var outOfStateT = 0;
			var totalT = 0;
			var maxT = 0;
			var inStateR = 0;
			var outOfStateR = 0;
			var totalR = 0;
			var studentPop = 0;
			var univ = '';
			for(var i in d){
				console.log("i is : " + i + " d[i] is: "+ d[i]);
				if(i == "pInState"){
					inState = d[i];
					console.log(inState);
				}
				else if(i == 'tInState'){
					inStateT = d[i];
					console.log("in state t " +inStateT);
				}
				else if(i == 'tOutOfState'){
					outOfStateT = d[i];
					console.log("out of state t " + outOfStateT);
				}
				else if(i == 'rInState'){
					inStateR = d[i];
				}
				else if(i == 'rOutOfState'){
					outOfStateR = d[i];
				}
				else if(i == 'studentPop'){
					studentPop = d[i];
				}
				else if(i == 'university'){
					univ = d[i];
				}
				
			}
			outOfState = 100 - inState; 
			totalR = inStateR + outOfStateR;
			totalT = inStateT + outOfStateT;
			maxT = (inStateT > outOfStateT) ? inStateT : outOfStateT;
			p = (inState/100)*Math.PI*2
			//console.log(p);
			//console.log(arc);
		
			arc = d3.svg.arc()
				.outerRadius(radius)
				.innerRadius(radius - 20)
				.startAngle(0-(Math.PI/2))
				.endAngle(p-(Math.PI/2));
			d3.select('.percentCircle')
	
				
				.attr("d", arc)
				
				
			d3.select('.inStatePercentNum')
				.text( inState+'%');
			d3.select('.outOfStatePercentNum')
				.text( (100-inState)+'%');
			d3.select('.outOfStateRate')
				.attr('width',(outOfStateT/totalT)*110 );
			d3.select('.inStateRate')
				.attr('width',(inStateT/totalT)*110 );
			d3.select('.outOfStateNum')
				.text('$'+addCommas(outOfStateT));
			d3.select('.inStateNum')
				.text('$'+addCommas(inStateT));
			d3.select('.inStateRev')
				.attr('height', (inStateR/totalR)*80)
				.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + (80-((inStateR/totalR)*80)));
			d3.select('.outOfStateRev')
				.attr('height', (outOfStateR/totalR)*80)
				.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + (80-((outOfStateR/totalR)*80)));	
			if(totalR < UNCTotalTuition){
				var diff = (((UNCTotalTuition-totalR)/UNCTotalTuition)* 40);
				d3.select('.totalStateRev')
					.attr('height', diff)
					.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 40)
					.attr('fill', '#f45d5d');
				
				d3.select('.diffRevNum')
					.text('Loss: $'+addCommas(UNCTotalTuition-totalR))
					.attr('fill', '#f45d5d');
			}else{
				var diff = (((totalR-UNCTotalTuition)/UNCTotalTuition)* 40);
				d3.select('.totalStateRev')
					.attr('height', diff)
					.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 40 - diff)
					.attr('fill', '#73ea59');
				d3.select('.diffRevNum')
					.text('Gain: $'+addCommas(totalR-UNCTotalTuition))
					.attr('fill', '#73ea59');
			}
			d3.select('.totalStateRevNum')
				.text('Total: $'+addCommas(totalR));
				
			d3.select('.inStateRevNum')
				.text('$'+addCommas(inStateR));
			d3.select('.outOfStateRevNum')
				.text('$'+addCommas(outOfStateR));
			d3.select('.studentPopNum')
				.text(addCommas(studentPop));
			d3.select('.schoolTitle')
				.text(univ);
		});
		
		
		
		setInterval(function() {
			percentCircle.transition()
			.duration(750)
			.call(arcTween, Math.random() * Math.PI * 2);
		}, 1500);
		
		
		function arcTween(transition, newAngle) {

		  // The function passed to attrTween is invoked for each selected element when
		  // the transition starts, and for each element returns the interpolator to use
		  // over the course of transition. This function is thus responsible for
		  // determining the starting angle of the transition (which is pulled from the
		  // element's bound datum, d.endAngle), and the ending angle (simply the
		  // newAngle argument to the enclosing function).
		  transition.attrTween("d", function(d) {

			// To interpolate between the two angles, we use the default d3.interpolate.
			// (Internally, this maps to d3.interpolateNumber, since both of the
			// arguments to d3.interpolate are numbers.) The returned function takes a
			// single argument t and returns a number between the starting angle and the
			// ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
			// newAngle; and for 0 < t < 1 it returns an angle in-between.
			var interpolate = d3.interpolate(d.endAngle, newAngle);

			// The return value of the attrTween is also a function: the function that
			// we want to run for each tick of the transition. Because we used
			// attrTween("d"), the return value of this last function will be set to the
			// "d" attribute at every tick. (It's also possible to use transition.tween
			// to run arbitrary code for every tick, say if you want to set multiple
			// attributes from a single function.) The argument t ranges from 0, at the
			// start of the transition, to 1, at the end.
			return function(t) {

			  // Calculate the current arc angle based on the transition time, t. Since
			  // the t for the transition and the t for the interpolate both range from
			  // 0 to 1, we can pass t directly to the interpolator.
			  //
			  // Note that the interpolated angle is written into the element's bound
			  // data object! This is important: it means that if the transition were
			  // interrupted, the data bound to the element would still be consistent
			  // with its appearance. Whenever we start a new arc transition, the
			  // correct starting angle can be inferred from the data.
			  d.endAngle = interpolate(t);

			  // Lastly, compute the arc path given the updated data! In effect, this
			  // transition uses data-space interpolation: the data is interpolated
			  // (that is, the end angle) rather than the path string itself.
			  // Interpolating the angles in polar coordinates, rather than the raw path
			  // string, produces valid intermediate arcs during the transition.
			  return arc(d);
			};
		  });
		}
		
		
	
/*		
	var bars = barGroups.selectAll('.rOutOfState')
		.data(function(d){ console.log("instate is: "+d.rInState + " out of stte is : " + d.rOutOfState);return [d.rOutOfState]; })
		.enter()
		.append('rect')
		.attr('class', 'bar')
            .attr('x', function(d) { return scaleX(d.university); })
            .attr('width', scaleX.rangeBand())
            .attr('y', function(d) { return scaleY(d.rOutOfState); })
            .attr('height', function(d) { return height - scaleY(d.rOutOfState); })
            .attr('fill', '#DE352E');
*/
    barGroups.selectAll('.rOutOfState')
        .data(function(d){return [d];})
        .enter()
        .append('rect')
            .attr('class', 'pOutOfState bar')
            .attr('x', function(d) { return scaleX(d.university); })
            .attr('width', scaleX.rangeBand())
            .attr('y', function(d) { console.log("height is " + height + "in state is " + d.rInState + " out of state is " + d.rOutOfState );return height - d.rOutOfState; })
            .attr('height', function(d) { return d.rOutOfState; })
            .attr('fill', '#66cef4');
            /*.on('mouseover', function(d) {
                d3.select('.tooltip')
                    .html(d.university + "<br />Out of state " + Math.round(d.rOutOfState))
                    .style('opacity', 1);
            })
            .on('mouseout', function(d) {
                d3.select('.tooltip')
                    .style('opacity', 0);
            })
            .on('mousemove', function(d) {
                //console.log(d3.event);
                d3.select('.tooltip')
                    .style('left', (d3.event.clientX + 20) + 'px')
                    .style('top', (d3.event.clientY) + 'px');
            });*/
			
	barGroups.selectAll('.pInState')
        .data(function(d){return [d];})
        .enter()
        .append('rect')
            .attr('class', 'pInState bar')
            .attr('x', function(d) { return scaleX(d.university); })
            .attr('width', scaleX.rangeBand())
            .attr('y', function(d) { 
			return height - d.rOutOfState - d.rInState - 5; })
			//return 0; })
            //.attr('height', function(d) { return /*height - scaleY(d.pOutOfState);*/ scaleY(d.rOutOfState); })
			.attr('height', function(d){return d.rInState;})
            .attr('fill', '#CCCCCC');
            /*.on('mouseover', function(d) {
                d3.select('.tooltip')
                    .html(d.university + "<br />In State " + Math.round(d.rInState))
                    .style('opacity', 1);
            })
            .on('mouseout', function(d) {
                d3.select('.tooltip')
                    .style('opacity', 0);
            })
            .on('mousemove', function(d) {
                //console.log(d3.event);
                d3.select('.tooltip')
                    .style('left', (d3.event.clientX + 20) + 'px')
                    .style('top', (d3.event.clientY) + 'px');
            });*/
	
			
	
		

});

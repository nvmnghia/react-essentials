import React, { useState, useEffect } from 'react';


class ClockClass extends React.Component<{}, {time: Date}> {
    timerID: any;

    // Mounting: create & insert a component into the DOM tree, i.e. FIRST render.
    // 3 mounting methods, in calling order:
    // - constructor()          setup state
    // - render()               render
    // - componentDidMount()    setup non-state shit

    // Updating: update component state.
    // updating methods, in calling order:
    // - shouldComponentUpdate()     decide if change of state/props worth rendering
    // - render()                    render
    // - componentDidUpdate()        ???

    // Unmounting: the opposite of mounting.
    // 1 unmounting method:
    // - componentWillUnmount()    cleanup for componentDidMount()

    // State initialization & method binding only.
    // Avoid setState() and side effect shit.
    // Component DOM not exists yet, as it is called BEFORE render().
    // Called ONCE.
    constructor(props: any) {
        super(props);
        this.state = {time: new Date()};
    }

    // Shit not related to state is setup here.
    // Can use setState() or side effect shit.
    // Component DOM exists, as it is called AFTER render().
    // Called ONCE.
    componentDidMount() {
        this.timerID = setInterval(this.tick.bind(this), 1000);
    }

    // Default to true.
    // If false is returned, read docs carefully.
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return true;
    }

    // The opposite of componentDidMount().
    // Shit is cleanup here.
    // Called once, obviously.
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // Triggered by:
    // - state changes: which is caused by
    //   - props changes
    //   - setState()
    // - shouldComponentUpdate()
    render() {
        return <div>{ this.state.time.toLocaleTimeString() }</div>
    }

    tick() {
        this.setState({time: new Date()});
    }
}

// Hook is a shift in paradigm, not a total equivalent of class component.
// The comments comparing hook & class component below is not entirely accurate
// just a quick & dirty rule of thumb.
const ClockFunc = (props: any) => {
    // Do what constructor does.
    const [time, setTime]: [Date, Function] = useState(new Date());

    useEffect(() => {
        // Do what componentDidMount does.
        const timerID = setInterval(() => setTime(new Date()), 1000);

        // Return a function doing what componentWillUnmount does.
        return () => clearInterval(timerID);
    })

    // Do what render() does.
    return <div>{ time.toLocaleTimeString() }</div>
}

export { ClockClass, ClockFunc };

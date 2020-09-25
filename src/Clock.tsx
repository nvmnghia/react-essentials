import React, { useState, useEffect, ReactNode } from 'react';


class ClockClass extends React.Component<{}, {time: Date}> {
    timerID: number | undefined = undefined;

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
        // Props: external, IMMUTABLE data.
        // Props are given by parent component.
        super(props);

        // State: internal, MUTABLE data.
        // State is created & modified inside the component.
        // State is created here normally, but modified
        // outside of constructor() by setState().
        this.state = {time: new Date()};

        // DOWNWARD data flow:
        // - Data is passed as props.
        // - State is created, might be from props.
        // - State is passed as props to a child components.
        // In the last case, when that state changes, the changes
        // propagates to the child component.
    }

    // Shit not related to state is setup here.
    // Can use setState() or side effect shit.
    // Component DOM exists, as it is called AFTER render().
    // Called ONCE.
    componentDidMount() {
        this.timerID = window.setInterval(this.tick.bind(this), 1000);
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
        window.clearInterval(this.timerID);
    }

    // Triggered by:
    // - state changes: which is caused by
    //   - getDerivedStateFromProps() (not recommended)
    //   - setState()
    // - forceUpdate() (not recommended)
    // Prevented by:
    // - shouldComponentUpdate()
    // - memo hook
    render(): ReactNode {
        return <div>{ this.state.time.toLocaleTimeString() }</div>
    }

    tick() {
        // 2 forms of setState():
        // - setState(State): MERGE (not overwrite) State with this.state.
        // - setState((State, Props) => State): calculate state from this.state & this.props.
        // If next state is calculated from current state/props, 2nd form must be used.
        this.setState({time: new Date()});    // 1st form
    }
}

// Hook (use()) must be called at the top level, NOT INSIDE loop/if/nested function.
// Hook is a shift in paradigm, not a total equivalent of class component.
// Therefore, strict 1:1 mapping of lifecycle methods & hooks is impossible.
// The comments comparing hook & class component below is not entirely
// accurate, just a quick rule of thumb.
const ClockFunc = (props: any): JSX.Element | null => {
    // Do what constructor does.
    const [time, setTime]: [Date, Function] = useState(new Date());

    useEffect(() => {
        // Do what componentDidMount() does.
        const timerID = setInterval(() => setTime(new Date()), 1000);

        // Return a function doing what componentWillUnmount() does.
        return () => clearInterval(timerID);
    });

    // Do what render() does.
    return <div>{ time.toLocaleTimeString() }</div>;
}

export { ClockClass, ClockFunc };

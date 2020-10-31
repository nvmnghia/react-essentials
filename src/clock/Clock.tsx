import React, { useState, useEffect, ReactElement } from 'react';

import { ExamplePane } from '../app/App';


interface ClockProps { };
interface ClockState {
  time: Date;
}


class ClockClass extends React.Component<
  // Due to (aggressive) type check, the type of props and state
  // MUST be listed up front.
  // For example, using <ClockClass abc/> generates error as abs
  // is not a field of the class/interface provided for props.
  ClockProps,    // Type of props
  ClockState     // Type of state
  > {

  timerID: number | undefined = undefined;

  // Mounting: create & insert a component into the DOM tree, i.e. FIRST render.
  // 3 mounting methods, in calling order:
  // - constructor()          initialize state
  // - render()               render
  // - componentDidMount()    setup non-state shit

  // Updating: update component state.
  // updating methods, in calling order:
  // - shouldComponentUpdate()     decide if change of state/props worth rendering
  // - render()                    render
  // - componentDidUpdate()        ???

  // Unmounting: undo what mounting does.
  // 1 unmounting method:
  // - componentWillUnmount()    cleanup for componentDidMount()

  // State initialization & method binding only.
  // Avoid setState() and side effect shit.
  // Component DOM not exists yet, as it is called BEFORE render().
  // Called ONCE.
  constructor(props: ClockProps) {
    // Props: external, IMMUTABLE data.
    // Props are given by parent component.
    super(props);

    // State: internal, MUTABLE data.
    // State is created & modified inside the component.
    // State is created here normally, but modified
    // outside of constructor() by setState().
    this.state = { time: new Date() };

    // DOWNWARD dataflow:
    // - Data is passed as props.
    // - State is created, might be from props.
    // - State is passed as props to a child components.
    // In the last case, when that state changes, the changes
    // propagates to the child components.
    // TODO: compare to unidirectional dataflow of Angular.

    // Q: Shouldn't props be immutable?
    // A: Props are immutable in the sense that the component can't
    //    mutate its props. Parent component can change data that
    //    was already passed as props to child component and that
    //    changes is propagated down as explained.
    // Tl;DR: props are states managed by parents.
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
  shouldComponentUpdate(nextProps: ClockProps, nextState: ClockState){
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
  render() {
    return (
      <div>    {/* ReactElement = JSX.Element */}
        { this.state.time.toLocaleTimeString() }    {/* ReactNode */}
      </div>
    );
  }

  tick(): void {
    // 2 forms of setState():
    // - setState(State): MERGE (not overwrite) State with this.state.
    // - setState((State, Props) => State): calculate state from this.state & this.props.
    // If next state is calculated from current state/props, 2nd form must be used.
    this.setState({ time: new Date() });    // 1st form
  }
}

const ClockFunc = (props: ClockProps): ReactElement => {
  // Hook (use()) must be called at the top level, NOT INSIDE loop/if/nested function.
  // Hook is a shift in paradigm, not a total equivalent of class component.
  // Therefore, strict 1:1 mapping of lifecycle methods & hooks is impossible.
  // The comments comparing hook & class component below is not entirely
  // accurate, just a quick rule of thumb.

  // Do what constructor does.
  const [time, setTime]: [Date, Function] = useState(new Date());

  useEffect(() => {
    // Do what componentDidMount() does.
    const timerID = setInterval(() => setTime(new Date()), 1000);

    // Return a function doing what componentWillUnmount() does.
    return () => clearInterval(timerID);
  });

  // Do what render() does.
  return (
    <div>
      { time.toLocaleTimeString() }
    </div>
  );
}

const ClockPane: ExamplePane = {
  title: 'Clock',
  element: () => <div> <ClockClass /> <ClockFunc /> </div>
}

export { ClockClass, ClockFunc, ClockPane };

import rules from './rules'
import React from 'react'

export default class Can extends React.Component {

  check = (rules, role, action, data) => {
    const permissions = rules[role];
    if (!permissions) {
      // role is not present in the rules
      return false;
    }

    const staticPermissions = permissions.static;

    if (staticPermissions && staticPermissions.includes(action)) {
      // static rule not provided for action
      return true;
    }

    const dynamicPermissions = permissions.dynamic;

    if (dynamicPermissions) {
      const permissionCondition = dynamicPermissions[action];
      if (!permissionCondition) {
        // dynamic rule not provided for action
        return false;
      }

      return permissionCondition(data);
    }
    return false;
  };

  render () {
    return this.check(rules, this.props.role, this.props.perform, this.props.data) ? this.props.yes : this.props.no
  }
}

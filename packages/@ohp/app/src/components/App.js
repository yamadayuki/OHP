// @flow
import { PureComponent } from 'react'

import Layout from 'components/common/Layout'
import Panes from 'components/common/Panes'

import Editor from 'components/editor'
import Outline from 'components/outline'
import Preview from 'components/preview'

type Props = {
}

export default class App extends PureComponent<void, Props, void> {
  render () {
    return (
      <Layout>
        <Panes
          split='vertical'
          defaultSize='60%'
          pane2Style={{ overflowY: 'scroll' }}
        >
          <Panes
            split='vertical'
            primary='second'
            minSize={30}
            defaultSize='70%'
          >
            <Outline />
            <Editor />
          </Panes>
          <Preview />
        </Panes>
      </Layout>
    )
  }
}

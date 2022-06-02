const tab = {
  title: 'Tab',
  content: <div>Tab Content</div>
};

export const riskManagementBox = {
  dockbox: {
      mode: 'horizontal',
      children: [
          {
              mode: 'vertical',
              children: [
                  {
                      tabs: [{ ...tab, id: 't1' }, { ...tab, id: 't2' }, { ...tab, id: 't3' }],
                  },
                  {
                      tabs: [{ ...tab, id: 't4' }, { ...tab, id: 't5' }, { ...tab, id: 't6' }],
                  }
              ]
          },
          {
              tabs: [{ ...tab, id: 't7' }, { ...tab, id: 't8' }, { ...tab, id: 't9' }]
          },
      ]
  }
};
